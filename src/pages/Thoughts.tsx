import { motion } from 'framer-motion';
import { useThoughts } from '@/contexts/ThoughtsContext';
import { Calendar } from 'lucide-react';

const Thoughts = () => {
  const { thoughts } = useThoughts();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Thoughts</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Daily reflections, quotes, and mindful observations.
          </p>

          {thoughts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No thoughts shared yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {thoughts.map((thought, idx) => (
                <motion.div
                  key={thought.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(thought.date)}</span>
                  </div>
                  <p className="text-foreground leading-relaxed">{thought.content}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default Thoughts;
