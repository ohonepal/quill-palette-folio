import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Thought {
  id: string;
  content: string;
  date: string;
}

interface ThoughtsContextType {
  thoughts: Thought[];
  addThought: (content: string) => void;
  updateThought: (id: string, content: string) => void;
  deleteThought: (id: string) => void;
  getThought: (id: string) => Thought | undefined;
}

const ThoughtsContext = createContext<ThoughtsContextType | undefined>(undefined);

const sampleThoughts: Thought[] = [
  {
    id: '1',
    content: 'Discipline is choosing between what you want now and what you want most.',
    date: new Date().toISOString(),
  },
  {
    id: '2',
    content: 'The market rewards patience and punishes impulsiveness.',
    date: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const ThoughtsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [thoughts, setThoughts] = useState<Thought[]>(() => {
    const stored = localStorage.getItem('thoughts');
    return stored ? JSON.parse(stored) : sampleThoughts;
  });

  useEffect(() => {
    localStorage.setItem('thoughts', JSON.stringify(thoughts));
  }, [thoughts]);

  const addThought = (content: string) => {
    const newThought: Thought = {
      id: Date.now().toString(),
      content,
      date: new Date().toISOString(),
    };
    setThoughts(prev => [newThought, ...prev]);
  };

  const updateThought = (id: string, content: string) => {
    setThoughts(prev =>
      prev.map(thought => (thought.id === id ? { ...thought, content } : thought))
    );
  };

  const deleteThought = (id: string) => {
    setThoughts(prev => prev.filter(thought => thought.id !== id));
  };

  const getThought = (id: string) => {
    return thoughts.find(thought => thought.id === id);
  };

  return (
    <ThoughtsContext.Provider value={{ thoughts, addThought, updateThought, deleteThought, getThought }}>
      {children}
    </ThoughtsContext.Provider>
  );
};

export const useThoughts = () => {
  const context = useContext(ThoughtsContext);
  if (!context) throw new Error('useThoughts must be used within ThoughtsProvider');
  return context;
};
