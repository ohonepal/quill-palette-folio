import { useState, useEffect } from 'react';
import { useThoughts } from '@/contexts/ThoughtsContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

interface ThoughtEditorProps {
  thoughtId?: string;
  onClose: () => void;
}

const ThoughtEditor = ({ thoughtId, onClose }: ThoughtEditorProps) => {
  const { addThought, updateThought, getThought } = useThoughts();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ content: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (thoughtId) {
      const thought = getThought(thoughtId);
      if (thought) {
        setFormData({ content: thought.content });
      }
    }
  }, [thoughtId, getThought]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (thoughtId) {
        await updateThought(thoughtId, formData);
        toast({
          title: 'Thought updated',
          description: 'Your thought has been successfully updated.',
        });
      } else {
        await addThought(formData);
        toast({
          title: 'Thought added',
          description: 'Your thought has been successfully added.',
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save thought. Please try again.',
        variant: 'destructive',
      });
    }
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
          <div>
            <Textarea
              value={formData.content}
              onChange={(e) => {
                setFormData({ content: e.target.value });
                if (errors.content) setErrors({ ...errors, content: '' });
              }}
              placeholder="Share your thoughts..."
              rows={8}
              className={`resize-none ${errors.content ? 'border-destructive' : ''}`}
            />
            {errors.content && (
              <p className="text-destructive text-sm mt-1">{errors.content}</p>
            )}
          </div>
          
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
