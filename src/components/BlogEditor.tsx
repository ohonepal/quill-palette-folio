import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import { useBlog } from '@/contexts/BlogContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface BlogEditorProps {
  postId: string | null;
  onClose: () => void;
}

const BlogEditor = ({ postId, onClose }: BlogEditorProps) => {
  const { addPost, updatePost, getPost } = useBlog();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (postId) {
      const post = getPost(postId);
      if (post) {
        setFormData({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
        });
      }
    }
  }, [postId, getPost]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      ['link'],
      ['clean'],
    ],
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }

    if (!formData.content.trim() || formData.content === '<p><br></p>') {
      newErrors.content = 'Content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSaving(true);

    try {
      if (postId) {
        await updatePost(postId, formData);
        toast({
          title: 'Post updated',
          description: 'Your blog post has been successfully updated.',
        });
      } else {
        await addPost({
          ...formData,
          author: user?.name || 'Anonymous',
        });
        toast({
          title: 'Post created',
          description: 'Your blog post has been successfully created.',
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save post. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        <Button variant="ghost" onClick={onClose} className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8">
            {postId ? 'Edit Post' : 'Create New Post'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  if (errors.title) setErrors({ ...errors, title: '' });
                }}
                placeholder="Enter post title"
                className={errors.title ? 'border-destructive' : ''}
              />
              {errors.title && (
                <p className="text-destructive text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Excerpt</label>
              <Input
                value={formData.excerpt}
                onChange={(e) => {
                  setFormData({ ...formData, excerpt: e.target.value });
                  if (errors.excerpt) setErrors({ ...errors, excerpt: '' });
                }}
                placeholder="Brief description of the post"
                className={errors.excerpt ? 'border-destructive' : ''}
              />
              {errors.excerpt && (
                <p className="text-destructive text-sm mt-1">{errors.excerpt}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <div className={`bg-background border rounded-md ${errors.content ? 'border-destructive' : 'border-input'}`}>
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(content) => {
                    setFormData({ ...formData, content });
                    if (errors.content) setErrors({ ...errors, content: '' });
                  }}
                  modules={modules}
                  className="min-h-[300px]"
                />
              </div>
              {errors.content && (
                <p className="text-destructive text-sm mt-1">{errors.content}</p>
              )}
            </div>

            <div className="flex gap-4">
              <Button type="submit" size="lg" className="flex-1" disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? 'Saving...' : (postId ? 'Update Post' : 'Publish Post')}
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={onClose} disabled={isSaving}>
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      </section>
    </div>
  );
};

export default BlogEditor;
