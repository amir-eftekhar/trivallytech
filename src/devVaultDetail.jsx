import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Header, Footer } from './page.jsx';
import { Github, ExternalLink, Users, Calendar, ArrowLeft, FileText, Code, Info, MessageCircle, Link as LinkIcon } from 'lucide-react';
import projects from './data/projects';

const DevVaultDetail = () => {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [project, setProject] = useState(null);
  
  useEffect(() => {
    // Find the project with the matching ID
    const foundProject = projects.find(p => p.id === projectId);
    setProject(foundProject);
  }, [projectId]);

  if (!project) {
    return (
      <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-32 pb-20 px-4 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Project not found</h2>
            <Link to="/dev-vault" className="text-[var(--accent-primary)] hover:underline flex items-center justify-center">
              <ArrowLeft size={16} className="mr-2" /> Back to Dev Vault
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Info size={18} /> },
    { id: 'features', label: 'Features', icon: <Code size={18} /> },
    { id: 'gallery', label: 'Gallery', icon: <FileText size={18} /> },
    { id: 'team', label: 'Team', icon: <Users size={18} /> }
  ];

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20 px-4 relative z-10">
        <div className="container mx-auto max-w-7xl">
          {/* Back button */}
          <Link 
            to="/dev-vault" 
            className="inline-flex items-center text-[var(--text-secondary)] hover:text-[var(--accent-primary)] mb-6 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Dev Vault
          </Link>

          {/* Project Hero */}
          <div className="relative rounded-2xl overflow-hidden mb-8">
            <div className="h-64 md:h-80 w-full overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-[var(--accent-primary)] text-white text-xs font-semibold rounded-full mb-4">
                    {project.status}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {project.title}
                  </h1>
                  <p className="text-white/80 text-lg max-w-3xl">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex space-x-4">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-[var(--accent-primary)]/80 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  {project.website && (
                    <a 
                      href={project.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-[var(--accent-primary)]/80 transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                  {project.documentation && (
                    <a 
                      href={project.documentation} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-[var(--accent-primary)]/80 transition-colors"
                    >
                      <FileText size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Project Meta */}
          <div className="bg-[var(--bg-secondary)] rounded-xl p-6 mb-8 border border-[var(--accent-primary)]/10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-2">Contributors</h3>
              <div className="flex -space-x-2 overflow-hidden">
                {project.contributors.map((contributor, index) => (
                  <div 
                    key={index}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-[var(--bg-primary)]"
                    title={contributor.name}
                  >
                    <img 
                      src={contributor.avatar} 
                      alt={contributor.name} 
                      className="h-full w-full object-cover rounded-full"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-2">Last Updated</h3>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2 text-[var(--text-secondary)]" />
                <span>{new Date(project.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg flex items-center transition-all ${
                    activeTab === tab.id
                      ? 'bg-[var(--accent-primary)] text-white shadow-md'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]/80'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-[var(--bg-secondary)] rounded-xl p-6 md:p-8 border border-[var(--accent-primary)]/10">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
                <div className="prose prose-lg max-w-none text-[var(--text-secondary)]">
                  {project.overview.split('\n').map((paragraph, index) => (
                    paragraph.trim() ? <p key={index} className="mb-4">{paragraph.trim()}</p> : null
                  ))}
                </div>
                
                {project.documentation && (
                  <div className="mt-8 p-6 bg-[var(--bg-primary)] rounded-lg border border-[var(--accent-primary)]/10">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <FileText size={20} className="mr-2" /> Documentation
                    </h3>
                    <p className="mb-4 text-[var(--text-secondary)]">
                      For detailed documentation, installation guides, and API references, visit our documentation site.
                    </p>
                    <a 
                      href={project.documentation} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-primary)]/90 transition-colors"
                    >
                      <LinkIcon size={16} className="mr-2" /> View Documentation
                    </a>
                  </div>
                )}
              </motion.div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.features.map((feature, index) => (
                    <div 
                      key={index}
                      className="p-6 bg-[var(--bg-primary)] rounded-lg border border-[var(--accent-primary)]/10"
                    >
                      <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center text-[var(--accent-primary)] mb-4">
                        {index + 1}
                      </div>
                      <p className="text-[var(--text-secondary)]">{feature}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.screenshots.map((screenshot, index) => (
                    <div 
                      key={index}
                      className="overflow-hidden rounded-lg border border-[var(--accent-primary)]/10"
                    >
                      <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                        <img 
                          src={screenshot.url} 
                          alt={screenshot.caption} 
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <div className="p-4 bg-[var(--bg-primary)]">
                        <p className="text-sm text-[var(--text-secondary)]">{screenshot.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Team Tab */}
            {activeTab === 'team' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6">Project Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.contributors.map((contributor, index) => (
                    <div 
                      key={index}
                      className="p-6 bg-[var(--bg-primary)] rounded-lg border border-[var(--accent-primary)]/10 flex items-center"
                    >
                      <img 
                        src={contributor.avatar} 
                        alt={contributor.name} 
                        className="w-16 h-16 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-lg">{contributor.name}</h3>
                        <p className="text-sm text-[var(--text-secondary)]">{contributor.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DevVaultDetail;
