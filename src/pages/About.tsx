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
              I'm a passionate full-stack developer with a love for creating elegant solutions to complex problems.
              With expertise in modern web technologies, I focus on building applications that are not only functional
              but also beautiful and user-friendly.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">My Values</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-2">Continuous Learning</h3>
                <p className="text-muted-foreground">
                  Technology evolves rapidly, and I'm committed to staying current with the latest tools,
                  frameworks, and best practices.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-2">Quality First</h3>
                <p className="text-muted-foreground">
                  I believe in writing clean, maintainable code and creating products that users love to use.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
                <p className="text-muted-foreground">
                  Great things are built by great teams. I thrive in collaborative environments where ideas flow freely.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-2">User-Centric</h3>
                <p className="text-muted-foreground">
                  Every decision I make is guided by the question: "How does this benefit the end user?"
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mt-12 mb-4">My Goals</h2>
            <p className="text-lg text-muted-foreground mb-6">
              My goal is to continue pushing the boundaries of what's possible on the web, creating innovative
              solutions that make a real impact. I'm particularly interested in:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-8 space-y-2">
              <li>Building scalable and maintainable applications</li>
              <li>Exploring new technologies and frameworks</li>
              <li>Contributing to open-source projects</li>
              <li>Mentoring aspiring developers</li>
              <li>Creating products that improve people's lives</li>
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12"
            >
              <Button size="lg" className="group">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
