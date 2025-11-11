import { motion } from 'framer-motion';
import { useState } from 'react';
import { useBlog } from '@/contexts/BlogContext';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import BlogEditor from '@/components/BlogEditor';

const Dashboard = () => {
  const { posts, deletePost } = useBlog();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deletePost(id);
      toast({
        title: 'Post deleted',
        description: 'The blog post has been successfully deleted.',
      });
    }
  };

  const handleEdit = (id: string) => {
    setEditingPostId(id);
    setIsEditorOpen(true);
  };

  const handleCreate = () => {
    setEditingPostId(null);
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingPostId(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isEditorOpen) {
    return <BlogEditor postId={editingPostId} onClose={handleCloseEditor} />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Dashboard</h1>
              <p className="text-lg text-muted-foreground">
                Welcome back, {user?.name}!
              </p>
            </div>
            <Button onClick={handleCreate} size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              New Post
            </Button>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <p className="text-muted-foreground text-lg mb-4">No blog posts yet.</p>
              <Button onClick={handleCreate}>Create Your First Post</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                      <p className="text-muted-foreground mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(post.date)}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(post.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(post.id, post.title)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default Dashboard;
