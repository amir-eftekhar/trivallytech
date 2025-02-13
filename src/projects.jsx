import React from 'react';
import { motion } from 'framer-motion';
import { Header, Footer } from './page.jsx';

const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      title: "AI Tutoring Platform",
      description: "A platform leveraging artificial intelligence to provide personalized tutoring experiences for students.",
      tech: ["React", "Python", "TensorFlow", "AWS"],
      status: "In Development"
    },
    {
      id: 2,
      title: "Community Learning Hub",
      description: "An online space for students to collaborate, share resources, and engage in peer-to-peer learning.",
      tech: ["Next.js", "Node.js", "MongoDB", "WebRTC"],
      status: "Planning Phase"
    },
    {
      id: 3,
      title: "STEM Workshop Series",
      description: "Interactive workshops focusing on various STEM topics, designed for high school students.",
      tech: ["Virtual Labs", "Interactive Simulations", "Live Coding"],
      status: "Ongoing"
    }
  ];

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen flex flex-col dot-pattern">
      <Header />
      
      <main className="flex-grow py-20 px-4 relative z-10">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-12">Our Projects</h1>
          <div className="space-y-6 max-w-4xl mx-auto">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-[var(--bg-secondary)] rounded-lg overflow-hidden border border-[var(--accent-primary)]/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="px-6 py-4">
                  <h3 className="text-xl font-semibold text-[var(--accent-primary)] mb-4">{project.title}</h3>
                  <p className="text-[var(--text-secondary)] mb-4">{project.description}</p>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-[var(--accent-primary)] mb-2">Technologies & Tools:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-[var(--text-secondary)]">
                    <span>Status: {project.status}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;