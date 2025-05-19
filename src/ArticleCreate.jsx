import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header, Footer } from './page.jsx';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { FaCode, FaPalette, FaRocket, FaServer, FaBox, FaUsers } from 'react-icons/fa';

const ArticleCreate = () => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    contributors: '',
    icon: 'code' // default icon
  });

  const icons = [
    { id: 'code', component: <FaCode className="text-[var(--accent-primary)] text-4xl" /> },
    { id: 'palette', component: <FaPalette className="text-[var(--accent-primary)] text-4xl" /> },
    { id: 'rocket', component: <FaRocket className="text-[var(--accent-primary)] text-4xl" /> },
    { id: 'server', component: <FaServer className="text-[var(--accent-primary)] text-4xl" /> },
    { id: 'box', component: <FaBox className="text-[var(--accent-primary)] text-4xl" /> },
    { id: 'users', component: <FaUsers className="text-[var(--accent-primary)] text-4xl" /> }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement article creation logic
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-5"></div>
      <Header />
      
      <main className="container mx-auto px-4 py-20 mt-20 relative z-10">
        <Link
          to="/articles"
          className="inline-flex items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="mr-2" /> Back to Articles
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Create New Article
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-[var(--text-primary)] font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--accent-primary)]/20 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                required
              />
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-[var(--text-primary)] font-medium mb-2">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--accent-primary)]/20 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-[var(--text-primary)] font-medium mb-2">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="15"
                className="w-full px-4 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--accent-primary)]/20 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                required
              />
            </div>

            {/* Contributors */}
            <div>
              <label htmlFor="contributors" className="block text-[var(--text-primary)] font-medium mb-2">
                Contributors (comma-separated)
              </label>
              <input
                type="text"
                id="contributors"
                name="contributors"
                value={formData.contributors}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--accent-primary)]/20 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                required
              />
            </div>

            {/* Icon Selection */}
            <div>
              <label className="block text-[var(--text-primary)] font-medium mb-2">
                Icon
              </label>
              <div className="grid grid-cols-6 gap-4">
                {icons.map((icon) => (
                  <button
                    key={icon.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, icon: icon.id }))}
                    className={`p-4 rounded-lg border ${
                      formData.icon === icon.id
                        ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10'
                        : 'border-[var(--accent-primary)]/20 hover:border-[var(--accent-primary)]/40'
                    }`}
                  >
                    {icon.component}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-primary)]/90 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300"
              >
                Create Article
              </button>
            </div>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleCreate;