import React, { createContext, useContext, useState, useEffect } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image?: string;
}

interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id' | 'date'>) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => BlogPost | undefined;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

// Sample initial posts
const samplePosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React',
    excerpt: 'Learn the basics of React and build your first component.',
    content: '<h2>Introduction</h2><p>React is a powerful library for building user interfaces. In this post, we\'ll explore the fundamentals...</p>',
    author: 'Your Name',
    date: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Mastering TailwindCSS',
    excerpt: 'Discover how to create beautiful designs with utility-first CSS.',
    content: '<h2>Why TailwindCSS?</h2><p>TailwindCSS is a utility-first CSS framework that makes styling effortless...</p>',
    author: 'Your Name',
    date: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const stored = localStorage.getItem('blogPosts');
    return stored ? JSON.parse(stored) : samplePosts;
  });

  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (post: Omit<BlogPost, 'id' | 'date'>) => {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const updatePost = (id: string, updatedPost: Partial<BlogPost>) => {
    setPosts(prev =>
      prev.map(post => (post.id === id ? { ...post, ...updatedPost } : post))
    );
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const getPost = (id: string) => {
    return posts.find(post => post.id === id);
  };

  return (
    <BlogContext.Provider value={{ posts, addPost, updatePost, deletePost, getPost }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error('useBlog must be used within BlogProvider');
  return context;
};
