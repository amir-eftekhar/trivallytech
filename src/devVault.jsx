import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header, Footer } from './page.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { Github, ExternalLink, Users, Tag, Calendar, Plus } from 'lucide-react';
import projects from './data/projects';
import { projectsApi } from './lib/supabase';
import { isAdmin } from './lib/adminAuth';

const DevVaultPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    loadProjects();
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const adminStatus = await isAdmin();
    setIsAdminUser(adminStatus);
  };

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsApi.getProjects();
      setProjects(data || []);
      setError(null);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError('Error loading projects from database.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = () => {
    if (!isAdminUser) {
      return;
    }
    navigate('/dev-vault/create');
  };

  // Filter projects based on active tab
  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  // Categories for the tabs
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'education', name: 'Education' },
    { id: 'community', name: 'Community' },
    { id: 'tools', name: 'Tools' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-primary)]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20 px-4 relative z-10">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <motion.div 
            className="mb-16 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Background decorative elements */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-500/10 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            
            {/* Add Project button - positioned absolutely */}
            <div className="absolute top-0 right-0 z-10">
              {isAdminUser && (
                <button
                  onClick={handleCreateProject}
                  className="inline-flex items-center px-6 py-3 bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-primary)]/90 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300"
                >
                  <Plus size={20} className="mr-2" /> Add Project
                </button>
              )}
            </div>
            
            {/* Centered content */}
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
                Dev Vault
              </h1>
              <p className="text-xl text-[var(--text-secondary)] mb-4">
                Explore our collection of innovative projects developed by the Tri-Valley Tech community.
              </p>
              <p className="text-lg text-[var(--text-secondary)]">
                Each project represents our commitment to technology education and community impact.
              </p>
            </div>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-12 overflow-x-auto pb-2">
            <div className="flex space-x-2 p-1.5 bg-[var(--bg-secondary)]/50 backdrop-blur-sm rounded-full border border-[var(--accent-primary)]/10 shadow-lg">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === category.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md transform scale-105'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group"
                >
                  <Link to={`/dev-vault/${project.id}`} className="block h-full">
                    <div className="bg-[var(--bg-secondary)] rounded-xl overflow-hidden border border-[var(--accent-primary)]/10 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col transform group-hover:-translate-y-2 group-hover:border-[var(--accent-primary)]/30">
                      {/* Project Image */}
                      <div className="h-56 overflow-hidden relative">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <span className="inline-block px-3 py-1 bg-[var(--accent-primary)] text-white text-xs font-semibold rounded-full">
                            {project.status}
                          </span>
                        </div>
                      </div>
                      
                      {/* Project Content */}
                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold text-[var(--accent-primary)] mb-2 group-hover:text-[var(--accent-primary)]/80">
                          {project.title}
                        </h3>
                        <p className="text-[var(--text-secondary)] mb-4 flex-grow">
                          {project.shortDescription}
                        </p>
                        
                        {/* Tech Tags */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {project.tech.slice(0, 3).map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] rounded-full text-xs font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.tech.length > 3 && (
                              <span className="px-3 py-1 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] rounded-full text-xs font-medium">
                                +{project.tech.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Project Meta */}
                        <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                          <div className="flex items-center">
                            <Users size={14} className="mr-1" />
                            <span>{project.contributors.length} contributors</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            <span>{new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Project Links */}
                      <div className="px-6 py-4 border-t border-[var(--accent-primary)]/10 flex justify-between items-center">
                        <div className="flex space-x-3">
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github size={18} />
                          </a>
                          {project.website && (
                            <a 
                              href={project.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink size={18} />
                            </a>
                          )}
                        </div>
                        <span className="text-sm font-medium text-[var(--accent-primary)] flex items-center">
                          View Details
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-32 max-w-lg mx-auto">
              <div className="bg-[var(--bg-secondary)]/50 rounded-xl p-10 border border-[var(--accent-primary)]/10 shadow-lg">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center">
                  <Tag size={32} className="text-[var(--accent-primary)]" />
                </div>
                <h3 className="text-2xl font-medium text-[var(--text-primary)] mb-3">No projects found</h3>
                <p className="text-[var(--text-secondary)]/80 mb-6">There are no projects in this category yet. Try selecting a different category or add a new project.</p>
                <button
                  onClick={() => setActiveTab('all')}
                  className="px-6 py-2 bg-[var(--bg-primary)] rounded-lg border border-[var(--accent-primary)]/20 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                >
                  View all projects
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DevVaultPage;
