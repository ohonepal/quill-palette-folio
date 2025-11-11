import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              I'm Khum Bahadur Katuwal — a dedicated founder of AHA Nepal and lifelong learner. I'm passionate about 
              discipline, mindfulness, and growth. Mornings are my sanctuary — where I meditate, plan, and strive 
              for efficiency. This space reflects my journey through markets, habits, and reflections.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">My Principles</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-2">Discipline</h3>
                <p className="text-muted-foreground">
                  Success in life comes from consistent habits and unwavering commitment to excellence.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-2">Focus</h3>
                <p className="text-muted-foreground">
                  Eliminating distractions and maintaining clarity on what truly matters in each moment.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-2">Efficiency</h3>
                <p className="text-muted-foreground">
                  Optimizing every system and process to maximize results with minimal wasted effort.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-2">Growth Mindset</h3>
                <p className="text-muted-foreground">
                  Every challenge is an opportunity to learn, improve, and become better than yesterday.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
