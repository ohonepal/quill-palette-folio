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
    title: 'Morning Routines: The Foundation of Success',
    excerpt: 'How starting your day with intention can transform your trading and life.',
    content: '<h2>The Power of Morning</h2><p>Mornings set the tone for everything that follows. As a crypto trader, I\'ve learned that a disciplined morning routine is non-negotiable...</p>',
    author: 'Khum Bahadur Katuwal',
    date: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Meditation and Market Analysis',
    excerpt: 'Finding clarity in chaos through mindfulness practice.',
    content: '<h2>The Connection</h2><p>Meditation has taught me to observe without reacting—a skill that\'s invaluable in volatile crypto markets...</p>',
    author: 'Khum Bahadur Katuwal',
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
