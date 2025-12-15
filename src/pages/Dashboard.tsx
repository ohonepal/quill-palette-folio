import { motion } from 'framer-motion';
import { useState } from 'react';
import { useBlog } from '@/contexts/BlogContext';
import { useThoughts } from '@/contexts/ThoughtsContext';
import { useGallery } from '@/contexts/GalleryContext';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import BlogEditor from '@/components/BlogEditor';
import ThoughtEditor from '@/components/ThoughtEditor';
import GalleryUploader from '@/components/GalleryUploader';
import ConfirmDialog from '@/components/ConfirmDialog';

const Dashboard = () => {
  const { posts, deletePost } = useBlog();
  const { thoughts, deleteThought } = useThoughts();
  const { images, deleteImage } = useGallery();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [isBlogEditorOpen, setIsBlogEditorOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  
  const [isThoughtEditorOpen, setIsThoughtEditorOpen] = useState(false);
  const [editingThoughtId, setEditingThoughtId] = useState<string | null>(null);
  
  const [isGalleryUploaderOpen, setIsGalleryUploaderOpen] = useState(false);

  // Confirmation dialogs
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    type: 'post' | 'thought' | 'image';
    id: string;
    title?: string;
  }>({ open: false, type: 'post', id: '' });

  const handleDeletePost = (id: string, title: string) => {
    setDeleteDialog({ open: true, type: 'post', id, title });
  };

  const handleDeleteThought = (id: string) => {
    setDeleteDialog({ open: true, type: 'thought', id });
  };

  const handleDeleteImage = (id: string) => {
    setDeleteDialog({ open: true, type: 'image', id });
  };

  const confirmDelete = async () => {
    try {
      if (deleteDialog.type === 'post') {
        await deletePost(deleteDialog.id);
        toast({ 
          title: 'Post deleted', 
          description: 'Blog post removed successfully.' 
        });
      } else if (deleteDialog.type === 'thought') {
        await deleteThought(deleteDialog.id);
        toast({ 
          title: 'Thought deleted', 
          description: 'Thought removed successfully.' 
        });
      } else if (deleteDialog.type === 'image') {
        await deleteImage(deleteDialog.id);
        toast({ 
          title: 'Image deleted', 
          description: 'Image removed from gallery.' 
        });
      }
    } catch (error) {
      toast({ 
        title: 'Error', 
        description: `Failed to delete ${deleteDialog.type}.`, 
        variant: 'destructive' 
      });
    } finally {
      setDeleteDialog({ open: false, type: 'post', id: '' });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isBlogEditorOpen) {
    return <BlogEditor postId={editingPostId} onClose={() => { setIsBlogEditorOpen(false); setEditingPostId(null); }} />;
  }

  return (
    <>
      <div className="min-h-[calc(100vh-4rem)]">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Dashboard</h1>
              <p className="text-lg text-muted-foreground">Welcome back, {user?.name}!</p>
            </div>

          <Tabs defaultValue="thoughts" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="thoughts">Thoughts</TabsTrigger>
              <TabsTrigger value="blog">Blog Posts</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>

            {/* Thoughts Tab */}
            <TabsContent value="thoughts">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Manage Thoughts</h2>
                <Button onClick={() => { setEditingThoughtId(null); setIsThoughtEditorOpen(true); }}>
                  <Plus className="h-4 w-4 mr-2" /> New Thought
                </Button>
              </div>
              
              {thoughts.length === 0 ? (
                <div className="text-center py-16 bg-card border border-border rounded-lg">
                  <p className="text-muted-foreground mb-2">No thoughts yet.</p>
                  <p className="text-sm text-muted-foreground">Create your first thought to get started.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {thoughts.map((thought) => (
                    <div key={thought.id} className="bg-card border border-border rounded-lg p-6">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-2">{formatDate(thought.date)}</p>
                          <p className="text-foreground">{thought.content}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" onClick={() => { setEditingThoughtId(thought.id); setIsThoughtEditorOpen(true); }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleDeleteThought(thought.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Blog Tab */}
            <TabsContent value="blog">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Manage Blog Posts</h2>
                <Button onClick={() => { setEditingPostId(null); setIsBlogEditorOpen(true); }}>
                  <Plus className="h-4 w-4 mr-2" /> New Post
                </Button>
              </div>
              
              {posts.length === 0 ? (
                <div className="text-center py-16 bg-card border border-border rounded-lg">
                  <p className="text-muted-foreground mb-2">No blog posts yet.</p>
                  <p className="text-sm text-muted-foreground">Create your first post to get started.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="bg-card border border-border rounded-lg p-6">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                          <p className="text-muted-foreground mb-2 line-clamp-2">{post.excerpt}</p>
                          <p className="text-sm text-muted-foreground">{formatDate(post.date)}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" onClick={() => { setEditingPostId(post.id); setIsBlogEditorOpen(true); }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleDeletePost(post.id, post.title)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Manage Gallery</h2>
                <Button onClick={() => setIsGalleryUploaderOpen(true)}>
                  <ImageIcon className="h-4 w-4 mr-2" /> Upload Image
                </Button>
              </div>
              
              {images.length === 0 ? (
                <div className="text-center py-16 bg-card border border-border rounded-lg">
                  <p className="text-muted-foreground mb-2">No images yet.</p>
                  <p className="text-sm text-muted-foreground">Upload your first image to get started.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="relative group">
                      <img src={image.url} alt="Gallery" className="w-full aspect-square object-cover rounded-lg" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteImage(image.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
          </motion.div>
        </section>

        {isThoughtEditorOpen && (
          <ThoughtEditor thoughtId={editingThoughtId || undefined} onClose={() => { setIsThoughtEditorOpen(false); setEditingThoughtId(null); }} />
        )}
        {isGalleryUploaderOpen && (
          <GalleryUploader onClose={() => setIsGalleryUploaderOpen(false)} />
        )}
      </div>

      <ConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
        onConfirm={confirmDelete}
        title={`Delete ${deleteDialog.type}?`}
        description={
          deleteDialog.type === 'post'
            ? `Are you sure you want to delete "${deleteDialog.title}"? This action cannot be undone.`
            : `Are you sure you want to delete this ${deleteDialog.type}? This action cannot be undone.`
        }
        confirmText="Delete"
        variant="destructive"
      />
    </>
  );
};

export default Dashboard;
