import { motion } from 'framer-motion';

const skillsData = [
  {
    category: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'Framer Motion', 'HTML5/CSS3'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'Python', 'Django', 'REST APIs', 'GraphQL'],
  },
  {
    category: 'Database',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Supabase', 'Firebase'],
  },
  {
    category: 'Tools & Others',
    skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'Figma', 'Jest'],
  },
  {
    category: 'Soft Skills',
    skills: ['Problem Solving', 'Team Collaboration', 'Communication', 'Time Management', 'Creativity', 'Adaptability'],
  },
];

const Skills = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Skills & Expertise</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Technologies and tools I work with to bring ideas to life.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillsData.map((category, idx) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 bg-[hsl(var(--section-bg))] rounded-lg p-8 text-center"
          >
            <h2 className="text-2xl font-semibold mb-4">Always Learning</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Technology never stops evolving, and neither do I. I'm constantly exploring new frameworks,
              languages, and tools to stay at the forefront of web development.
            </p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Skills;
