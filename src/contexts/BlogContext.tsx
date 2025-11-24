import React, { createContext, useContext, useState, useEffect } from 'react';
import { blogService, BlogPost } from '@/api/services/blogService';

export type { BlogPost };

interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id' | 'date'>) => Promise<void>;
  updatePost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  getPost: (id: string) => BlogPost | undefined;
  isLoading: boolean;
  refreshPosts: () => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshPosts = async () => {
    try {
      setIsLoading(true);
      const fetchedPosts = await blogService.getAllPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  const addPost = async (post: Omit<BlogPost, 'id' | 'date'>) => {
    try {
      const newPost = await blogService.createPost({
        ...post,
        author: post.author,
      });
      setPosts(prev => [newPost, ...prev]);
    } catch (error) {
      console.error('Failed to create post:', error);
      throw error;
    }
  };

  const updatePost = async (id: string, updatedPost: Partial<BlogPost>) => {
    try {
      const updated = await blogService.updatePost(id, updatedPost);
      setPosts(prev =>
        prev.map(post => (post.id === id ? updated : post))
      );
    } catch (error) {
      console.error('Failed to update post:', error);
      throw error;
    }
  };

  const deletePost = async (id: string) => {
    try {
      await blogService.deletePost(id);
      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (error) {
      console.error('Failed to delete post:', error);
      throw error;
    }
  };

  const getPost = (id: string) => {
    return posts.find(post => post.id === id);
  };

  return (
    <BlogContext.Provider value={{ posts, addPost, updatePost, deletePost, getPost, isLoading, refreshPosts }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error('useBlog must be used within BlogProvider');
  return context;
};
