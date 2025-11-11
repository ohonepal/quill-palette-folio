import { useState, useEffect } from 'react';
import { useThoughts } from '@/contexts/ThoughtsContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

interface ThoughtEditorProps {
  thoughtId?: string;
  onClose: () => void;
}

const ThoughtEditor = ({ thoughtId, onClose }: ThoughtEditorProps) => {
  const { addThought, updateThought, getThought } = useThoughts();
  const [content, setContent] = useState('');

  useEffect(() => {
    if (thoughtId) {
      const thought = getThought(thoughtId);
      if (thought) {
        setContent(thought.content);
      }
    }
  }, [thoughtId, getThought]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    if (thoughtId) {
      updateThought(thoughtId, content);
    } else {
      addThought(content);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            {thoughtId ? 'Edit Thought' : 'New Thought'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            rows={8}
            className="resize-none"
          />
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              {thoughtId ? 'Update' : 'Publish'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ThoughtEditor;
