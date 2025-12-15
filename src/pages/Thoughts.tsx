import { motion } from 'framer-motion';
import { useThoughts } from '@/contexts/ThoughtsContext';
import { Calendar, Loader2 } from 'lucide-react';

const Thoughts = () => {
  const { thoughts, isLoading } = useThoughts();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Thoughts</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Daily reflections, mindful observations, and moments of clarity.
            </p>
          </div>

          {thoughts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-20 bg-card border border-border rounded-lg"
            >
              <p className="text-muted-foreground text-lg mb-2">No thoughts shared yet.</p>
              <p className="text-sm text-muted-foreground">
                Check back soon for new reflections.
              </p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {thoughts.map((thought, idx) => (
                <motion.div
                  key={thought.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(thought.date)}</span>
                  </div>
                  <p className="text-foreground leading-relaxed text-base">
                    "{thought.content}"
                  </p>
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
