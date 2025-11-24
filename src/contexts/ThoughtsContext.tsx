import React, { createContext, useContext, useState, useEffect } from 'react';
import { thoughtsService, Thought } from '@/api/services/thoughtsService';

export type { Thought };

interface ThoughtsContextType {
  thoughts: Thought[];
  addThought: (thought: Omit<Thought, 'id' | 'date'>) => Promise<void>;
  updateThought: (id: string, thought: Partial<Thought>) => Promise<void>;
  deleteThought: (id: string) => Promise<void>;
  getThought: (id: string) => Thought | undefined;
  isLoading: boolean;
  refreshThoughts: () => Promise<void>;
}

const ThoughtsContext = createContext<ThoughtsContextType | undefined>(undefined);

export const ThoughtsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshThoughts = async () => {
    try {
      setIsLoading(true);
      const fetchedThoughts = await thoughtsService.getAllThoughts();
      setThoughts(fetchedThoughts);
    } catch (error) {
      console.error('Failed to fetch thoughts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshThoughts();
  }, []);

  const addThought = async (thought: Omit<Thought, 'id' | 'date'>) => {
    try {
      const newThought = await thoughtsService.createThought(thought);
      setThoughts(prev => [newThought, ...prev]);
    } catch (error) {
      console.error('Failed to create thought:', error);
      throw error;
    }
  };

  const updateThought = async (id: string, updatedThought: Partial<Thought>) => {
    try {
      const updated = await thoughtsService.updateThought(id, updatedThought);
      setThoughts(prev =>
        prev.map(thought => (thought.id === id ? updated : thought))
      );
    } catch (error) {
      console.error('Failed to update thought:', error);
      throw error;
    }
  };

  const deleteThought = async (id: string) => {
    try {
      await thoughtsService.deleteThought(id);
      setThoughts(prev => prev.filter(thought => thought.id !== id));
    } catch (error) {
      console.error('Failed to delete thought:', error);
      throw error;
    }
  };

  const getThought = (id: string) => {
    return thoughts.find(thought => thought.id === id);
  };

  return (
    <ThoughtsContext.Provider value={{ thoughts, addThought, updateThought, deleteThought, getThought, isLoading, refreshThoughts }}>
      {children}
    </ThoughtsContext.Provider>
  );
};

export const useThoughts = () => {
  const context = useContext(ThoughtsContext);
  if (!context) throw new Error('useThoughts must be used within ThoughtsProvider');
  return context;
};
