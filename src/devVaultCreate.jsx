import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Header, Footer } from './page.jsx';
import { ArrowLeft, Plus, X, Upload, Check, AlertCircle, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import projects from './data/projects';
import { supabase } from './lib/supabase';

const FALLBACK_IMAGES = {
  avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6IiBmaWxsPSIjNjY2Ii8+PC9zdmc+',
  image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xOSAzSDVjLTEuMSAwLTIgLjktMiAydjE0YzAgMS4xLjkgMiAyIDJoMTRjMS4xIDAgMi0uOSAyLTJWNWMwLTEuMS0uOS0yLTItMnptMCAxNkg1VjVoMTR2MTR6bS01LTdjLS44MyAwLTEuNS0uNjctMS41LTEuNVMxMy4xNyA5IDEyIDlzLTEuNS42Ny0xLjUgMS41UzExLjE3IDEyIDEyIDEyczEuNS0uNjcgMS41LTEuNVMxMi44MyA5IDEyIDl6bS0zIDVoNnYtLjA0YzAtLjI4LS4yMi0uNS0uNS0uNWgtNWMtLjI4IDAtLjUuMjItLjUuNVYxNHoiIGZpbGw9IiM2NjYiLz48L3N2Zz4='
};

const ImageUploadField = ({ 
  value, 
  onChange, 
  onUpload, 
  error, 
  label, 
  required = false,
  className = "",
  previewClassName = "h-48"
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(value || FALLBACK_IMAGES.image);
  const fileInputRef = useRef(null);

  // Update preview when value changes
  useEffect(() => {
    setPreviewUrl(value || FALLBACK_IMAGES.image);
  }, [value]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (file) {
      // Create a preview URL
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      // Call the upload handler
      onUpload({ target: { files: [file] } });
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setPreviewUrl(url || FALLBACK_IMAGES.image);
    onChange(e);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-[var(--text-secondary)]">
        {label}{required && "*"}
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleUrlChange}
          placeholder="Enter image URL or upload a file"
          className={`w-full px-4 py-2.5 rounded-lg bg-[var(--bg-primary)] border ${
            error ? 'border-red-500' : 'border-[var(--accent-primary)]/20'
          } focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50`}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
          <label className="cursor-pointer p-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
            <Upload size={20} />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-500 flex items-center">
          <AlertCircle size={14} className="mr-1" /> {error}
        </p>
      )}
      <div className="mt-4 p-4 border border-[var(--accent-primary)]/20 rounded-lg">
        <div className="relative group">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className={`w-full ${previewClassName} object-cover rounded-lg`}
            onError={() => setPreviewUrl(FALLBACK_IMAGES.image)}
          />
          {value && (
            <button
              type="button"
              onClick={() => {
                setPreviewUrl(FALLBACK_IMAGES.image);
                onChange({ target: { value: '' } });
              }}
              className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>
      <div
        className={`mt-4 border-2 border-dashed rounded-lg p-6 transition-colors relative ${
          isDragging 
            ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/5' 
            : 'border-[var(--accent-primary)]/20 hover:border-[var(--accent-primary)]/40'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center text-[var(--text-secondary)]">
          <Upload size={24} className="mb-2" />
          <p className="text-sm text-center">Drag and drop images here</p>
          <p className="text-xs text-center mt-1">or click to browse</p>
          <label className="absolute inset-0 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

const AvatarUploadField = ({ 
  value, 
  onChange, 
  onUpload, 
  error, 
  label, 
  required = false,
  className = "",
  contributorIndex = null
}) => {
  const [previewUrl, setPreviewUrl] = useState(value || FALLBACK_IMAGES.avatar);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPreviewUrl(value || FALLBACK_IMAGES.avatar);
  }, [value]);

  const handleFileSelect = (file) => {
    if (file) {
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      onUpload({ target: { files: [file] } }, contributorIndex);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setPreviewUrl(url || FALLBACK_IMAGES.avatar);
    onChange(e);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-[var(--text-secondary)]">
        {label}{required && "*"}
      </label>
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 group">
          <img 
            src={previewUrl} 
            alt="Avatar" 
            className="w-full h-full rounded-full object-cover border-2 border-[var(--accent-primary)]/20"
            onError={() => setPreviewUrl(FALLBACK_IMAGES.avatar)}
          />
          {value && (
            <button
              type="button"
              onClick={() => {
                setPreviewUrl(FALLBACK_IMAGES.avatar);
                onChange({ target: { value: '' } });
              }}
              className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          )}
          <label className="absolute inset-0 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={handleUrlChange}
              placeholder="Enter avatar URL or upload a file"
              className={`w-full px-4 py-2.5 rounded-lg bg-[var(--bg-primary)] border ${
                error ? 'border-red-500' : 'border-[var(--accent-primary)]/20'
              } focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50`}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <label className="cursor-pointer p-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                <Upload size={20} />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          {error && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircle size={14} className="mr-1" /> {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Add this utility function at the top (after imports)
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const DevVaultCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    shortDescription: '',
    image: '',
    imageFile: null,
    tech: [''],
    category: '',
    customCategory: '',
    github: '',
    website: '',
    documentation: '',
    contributors: [{ name: '', role: '', avatar: '', avatarFile: null }],
    date: new Date().toISOString().split('T')[0],
    status: 'Planning Phase',
    overview: '',
    features: [''],
    screenshots: [{ url: '', caption: '' }],
    screenshotFiles: []
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const formRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Get existing categories from projects data
  const existingCategories = [...new Set(projects.map(p => p.category))].filter(Boolean);
  
  const categories = [
    { id: 'education', name: 'Education' },
    { id: 'community', name: 'Community' },
    { id: 'tools', name: 'Tools' },
    ...existingCategories
      .filter(cat => !['education', 'community', 'tools'].includes(cat))
      .map(cat => ({ id: cat, name: cat.charAt(0).toUpperCase() + cat.slice(1) })),
    { id: 'custom', name: 'Add New Category...' }
  ];
  
  const statusOptions = [
    'Planning Phase',
    'In Development',
    'Beta Testing',
    'Completed',
    'Ongoing',
    'On Hold'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleIdChange = (e) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    setFormData(prev => ({
      ...prev,
      id: value
    }));
    
    if (errors.id) {
      setErrors(prev => ({
        ...prev,
        id: ''
      }));
    }
  };

  const handleTechChange = (index, value) => {
    const newTech = [...formData.tech];
    newTech[index] = value;
    setFormData(prev => ({
      ...prev,
      tech: newTech
    }));
  };

  const addTech = () => {
    setFormData(prev => ({
      ...prev,
      tech: [...prev.tech, '']
    }));
  };

  const removeTech = (index) => {
    const newTech = [...formData.tech];
    newTech.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      tech: newTech.length ? newTech : ['']
    }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index) => {
    const newFeatures = [...formData.features];
    newFeatures.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      features: newFeatures.length ? newFeatures : ['']
    }));
  };

  const handleContributorChange = (index, field, value) => {
    const newContributors = [...formData.contributors];
    newContributors[index] = {
      ...newContributors[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      contributors: newContributors
    }));
  };

  const addContributor = () => {
    setFormData(prev => ({
      ...prev,
      contributors: [...prev.contributors, { name: '', role: '', avatar: '', avatarFile: null }]
    }));
  };

  const removeContributor = (index) => {
    const newContributors = [...formData.contributors];
    newContributors.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      contributors: newContributors.length ? newContributors : [{ name: '', role: '', avatar: '', avatarFile: null }]
    }));
  };

  const handleScreenshotChange = (index, field, value) => {
    const newScreenshots = [...formData.screenshots];
    newScreenshots[index] = {
      ...newScreenshots[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      screenshots: newScreenshots
    }));
  };

  const addScreenshot = () => {
    setFormData(prev => ({
      ...prev,
      screenshots: [...prev.screenshots, { url: '', caption: '' }]
    }));
  };

  const removeScreenshot = (index) => {
    const newScreenshots = [...formData.screenshots];
    newScreenshots.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      screenshots: newScreenshots.length ? newScreenshots : [{ url: '', caption: '' }]
    }));
  };

  // Update handleImageUpload to use base64
  const handleImageUpload = async (e, type = 'main', contributorIndex = null) => {
    try {
      setUploading(true);
      const files = Array.from(e.target.files);
      if (files.length === 0) return;
      const file = files[0];
      const base64 = await fileToBase64(file);
      if (type === 'main') {
        setFormData(prev => ({
          ...prev,
          image: base64, // Store base64 string
          imageFile: null // Clear file object
        }));
      } else if (type === 'avatar' && contributorIndex !== null) {
        setFormData(prev => ({
          ...prev,
          contributors: prev.contributors.map((c, i) =>
            i === contributorIndex
              ? { ...c, avatar: base64, avatarFile: null }
              : c
          )
        }));
      } else if (type === 'screenshots') {
        setFormData(prev => ({
          ...prev,
          screenshots: [
            ...(prev.screenshots || []),
            { url: base64, caption: file.name }
          ],
          screenshotFiles: []
        }));
      }
    } catch (error) {
      console.error('Error handling image:', error);
      setError(`Error handling image: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!formData.id) newErrors.id = 'Project ID is required';
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.shortDescription) newErrors.shortDescription = 'Short description is required';
    if (!formData.image && !formData.imageFile) newErrors.image = 'Image is required (URL or file upload)';
    if (!formData.overview) newErrors.overview = 'Overview is required';
    if (!formData.github) newErrors.github = 'GitHub URL is required';
    
    // Validate category
    if (!formData.category) {
      newErrors.category = 'Category is required';
    } else if (formData.category === 'custom' && !formData.customCategory.trim()) {
      newErrors.customCategory = 'New category name is required';
    }
    
    // Check if ID already exists
    const existingProject = projects.find(p => p.id === formData.id);
    if (existingProject) newErrors.id = 'Project ID already exists';
    
    // Validate tech stack
    const validTech = formData.tech.filter(t => t.trim() !== '');
    if (validTech.length === 0) newErrors.tech = 'At least one technology is required';
    
    // Validate features
    const validFeatures = formData.features.filter(f => f.trim() !== '');
    if (validFeatures.length === 0) newErrors.features = 'At least one feature is required';
    
    // Validate contributors
    const validContributors = formData.contributors.filter(c => c.name.trim() !== '' && c.role.trim() !== '');
    if (validContributors.length === 0) newErrors.contributors = 'At least one contributor is required';
    
    // Validate screenshots
    const validScreenshots = formData.screenshots.filter(s => s.url.trim() !== '');
    const hasScreenshotFiles = formData.screenshotFiles && formData.screenshotFiles.length > 0;
    if (validScreenshots.length === 0 && !hasScreenshotFiles) {
      newErrors.screenshots = 'At least one screenshot is required (URL or file upload)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Update handleSubmit to skip all uploadFile logic and just save base64 strings
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      setUploading(true);
      let finalCategory = formData.category;
      if (formData.category === 'custom' && formData.customCategory.trim()) {
        finalCategory = formData.customCategory.trim().toLowerCase();
      }
      // Clean up empty fields
      const cleanedData = {
        ...formData,
        category: finalCategory,
        tech: formData.tech.filter(t => t.trim() !== ''),
        features: formData.features.filter(f => f.trim() !== ''),
        contributors: formData.contributors.filter(c => c.name.trim() !== ''),
        screenshots: formData.screenshots.filter(s => s.url.trim() !== '')
      };
      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            id: cleanedData.id,
            title: cleanedData.title,
            description: cleanedData.description,
            short_description: cleanedData.shortDescription,
            image_base64: cleanedData.image, // Save base64 string
            technologies: cleanedData.tech,
            category: cleanedData.category,
            github_link: cleanedData.github,
            website_link: cleanedData.website,
            documentation_link: cleanedData.documentation,
            contributors: cleanedData.contributors,
            date: cleanedData.date,
            status: cleanedData.status,
            overview: cleanedData.overview,
            features: cleanedData.features,
            screenshots: cleanedData.screenshots,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select()
        .single();
      if (error) throw error;
      setSuccessMessage('Project created successfully!');
      setTimeout(() => {
        navigate('/dev-vault');
      }, 2000);
    } catch (error) {
      console.error('Error creating project:', error);
      setError('Error creating project: ' + error.message);
    } finally {
      setIsSubmitting(false);
      setUploading(false);
    }
  };

  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
      setFormData({
        id: '',
        title: '',
        description: '',
        shortDescription: '',
        image: '',
        imageFile: null,
        tech: [''],
        category: '',
        customCategory: '',
        github: '',
        website: '',
        documentation: '',
        contributors: [{ name: '', role: '', avatar: '', avatarFile: null }],
        date: new Date().toISOString().split('T')[0],
        status: 'Planning Phase',
        overview: '',
        features: [''],
        screenshots: [{ url: '', caption: '' }],
        screenshotFiles: []
      });
      setErrors({});
    }
  };

  const inputClasses = "w-full px-4 py-2.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--accent-primary)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50";
  const sectionHeadingClasses = "text-xl font-bold mb-6 pb-2 border-b border-[var(--accent-primary)]/10";
  const sectionClasses = "space-y-6";

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          {/* Back button */}
          <Link 
            to="/dev-vault" 
            className="inline-flex items-center text-[var(--text-secondary)] hover:text-[var(--accent-primary)] mb-6 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Dev Vault
          </Link>

          {/* Page Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
              Add New Project
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Fill out the form below to add a new project to the Dev Vault. All fields marked with an asterisk (*) are required.
            </p>
          </motion.div>

          {/* Success Message */}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg flex items-center"
            >
              <Check size={20} className="text-green-600 dark:text-green-400 mr-3" />
              <span className="text-green-800 dark:text-green-300">{successMessage}</span>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Form */}
          <motion.form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-[var(--bg-secondary)] rounded-xl p-8 md:p-10 border border-[var(--accent-primary)]/10 shadow-lg space-y-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-8">
              {/* Basic Information Section */}
              <div>
                <h2 className={sectionHeadingClasses}>
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Project ID */}
                  <div className="col-span-1">
                    <label htmlFor="id" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      Project ID* <span className="text-xs">(URL-friendly, no spaces)</span>
                    </label>
                    <input
                      type="text"
                      id="id"
                      name="id"
                      value={formData.id}
                      onChange={handleIdChange}
                      className={inputClasses}
                      placeholder="e.g., ai-tutor"
                    />
                    {errors.id && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle size={14} className="mr-1" /> {errors.id}
                      </p>
                    )}
                  </div>

                  {/* Project Title */}
                  <div className="col-span-1">
                    <label htmlFor="title" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      Project Title*
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="e.g., AI Tutoring Platform"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle size={14} className="mr-1" /> {errors.title}
                      </p>
                    )}
                  </div>

                  {/* Short Description */}
                  <div className="col-span-2">
                    <label htmlFor="shortDescription" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      Short Description* <span className="text-xs">(Displayed on cards, max 100 chars)</span>
                    </label>
                    <input
                      type="text"
                      id="shortDescription"
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleChange}
                      maxLength={100}
                      className={inputClasses}
                      placeholder="Brief description of your project"
                    />
                    <div className="mt-1 flex justify-between text-xs text-[var(--text-secondary)]">
                      <span>{formData.shortDescription.length}/100 characters</span>
                      {errors.shortDescription && (
                        <p className="text-sm text-red-500 flex items-center">
                          <AlertCircle size={14} className="mr-1" /> {errors.shortDescription}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Full Description */}
                  <div className="col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      Full Description*
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className={inputClasses}
                      placeholder="Detailed description of your project"
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle size={14} className="mr-1" /> {errors.description}
                      </p>
                    )}
                  </div>

                  {/* Project Image */}
                  <div className="col-span-2">
                    <ImageUploadField
                      label="Project Image"
                      value={formData.image}
                      onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      onUpload={(e) => handleImageUpload(e, 'main')}
                      error={errors.image}
                      required
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="col-span-1">
                  <label htmlFor="category" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Category*
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        category: value
                      }));
                    }}
                    className={inputClasses}
                  >
                    <option value="" disabled>Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Custom Category - only shown when "Add New Category" is selected */}
                {formData.category === 'custom' && (
                  <div className="col-span-1">
                    <label htmlFor="customCategory" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      New Category Name*
                    </label>
                    <input
                      type="text"
                      id="customCategory"
                      name="customCategory"
                      value={formData.customCategory}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="Enter new category name"
                    />
                    {errors.customCategory && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle size={14} className="mr-1" /> {errors.customCategory}
                      </p>
                    )}
                  </div>
                )}

                {/* Status */}
                <div className="col-span-1">
                  <label htmlFor="status" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Status*
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={inputClasses}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="col-span-1">
                  <label htmlFor="date" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Date*
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            {/* Links Section */}
            <div>
              <h2 className={sectionHeadingClasses}>
                Project Links
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* GitHub */}
                <div className="col-span-1">
                  <label htmlFor="github" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    GitHub URL*
                  </label>
                  <input
                    type="url"
                    id="github"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="https://github.com/username/project"
                  />
                  {errors.github && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle size={14} className="mr-1" /> {errors.github}
                    </p>
                  )}
                </div>

                {/* Website */}
                <div className="col-span-1">
                  <label htmlFor="website" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Website URL <span className="text-xs">(optional)</span>
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="https://example.com"
                  />
                </div>

                {/* Documentation */}
                <div className="col-span-2">
                  <label htmlFor="documentation" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Documentation URL <span className="text-xs">(optional)</span>
                  </label>
                  <input
                    type="url"
                    id="documentation"
                    name="documentation"
                    value={formData.documentation}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="https://docs.example.com"
                  />
                </div>
              </div>
            </div>

            {/* Tech Stack Section */}
            <div>
              <h2 className={sectionHeadingClasses}>
                Tech Stack
              </h2>
              <div className={sectionClasses}>
                {formData.tech.map((tech, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => handleTechChange(index, e.target.value)}
                      className={inputClasses}
                      placeholder={`Technology ${index + 1} (e.g., React)`}
                    />
                    <button
                      type="button"
                      onClick={() => removeTech(index)}
                      className="p-2 text-[var(--text-secondary)] hover:text-red-500 transition-colors"
                      disabled={formData.tech.length === 1}
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
                {errors.tech && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.tech}
                  </p>
                )}
                <button
                  type="button"
                  onClick={addTech}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border border-[var(--accent-primary)]/20 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 transition-colors"
                >
                  <Plus size={16} className="mr-2" /> Add Technology
                </button>
              </div>
            </div>

            {/* Overview Section */}
            <div>
              <h2 className={sectionHeadingClasses}>
                Project Overview
              </h2>
              <div>
                <label htmlFor="overview" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Overview* <span className="text-xs">(Detailed description of the project)</span>
                </label>
                <textarea
                  id="overview"
                  name="overview"
                  value={formData.overview}
                  onChange={handleChange}
                  rows={6}
                  className={inputClasses}
                  placeholder="Provide a detailed overview of your project..."
                />
                {errors.overview && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.overview}
                  </p>
                )}
                <p className="mt-2 text-xs text-[var(--text-secondary)]">
                  You can use line breaks to structure your content. Each paragraph will be displayed separately.
                </p>
              </div>
            </div>

            {/* Features Section */}
            <div>
              <h2 className={sectionHeadingClasses}>
                Key Features
              </h2>
              <div className={sectionClasses}>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className={inputClasses}
                      placeholder={`Feature ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-2 text-[var(--text-secondary)] hover:text-red-500 transition-colors"
                      disabled={formData.features.length === 1}
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
                {errors.features && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.features}
                  </p>
                )}
                <button
                  type="button"
                  onClick={addFeature}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border border-[var(--accent-primary)]/20 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 transition-colors"
                >
                  <Plus size={16} className="mr-2" /> Add Feature
                </button>
              </div>
            </div>

            {/* Contributors Section */}
            <div>
              <h2 className={sectionHeadingClasses}>
                Contributors
              </h2>
              <div className={sectionClasses}>
                {formData.contributors.map((contributor, index) => (
                  <div key={index} className="p-4 bg-[var(--bg-primary)] rounded-lg border border-[var(--accent-primary)]/10">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Contributor {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeContributor(index)}
                        className="p-1 text-[var(--text-secondary)] hover:text-red-500 transition-colors"
                        disabled={formData.contributors.length === 1}
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                          Name*
                        </label>
                        <input
                          type="text"
                          value={contributor.name}
                          onChange={(e) => handleContributorChange(index, 'name', e.target.value)}
                          className={inputClasses}
                          placeholder="Contributor name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                          Role*
                        </label>
                        <input
                          type="text"
                          value={contributor.role}
                          onChange={(e) => handleContributorChange(index, 'role', e.target.value)}
                          className={inputClasses}
                          placeholder="e.g., Project Lead, Developer"
                        />
                      </div>
                      <div className="col-span-2">
                        <AvatarUploadField
                          label="Avatar"
                          value={contributor.avatar}
                          onChange={(e) => handleContributorChange(index, 'avatar', e.target.value)}
                          onUpload={(e) => handleImageUpload(e, 'avatar', index)}
                          contributorIndex={index}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {errors.contributors && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.contributors}
                  </p>
                )}
                <button
                  type="button"
                  onClick={addContributor}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border border-[var(--accent-primary)]/20 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 transition-colors"
                >
                  <Plus size={16} className="mr-2" /> Add Contributor
                </button>
              </div>
            </div>

            {/* Screenshots Section */}
            <div>
              <h2 className={sectionHeadingClasses}>
                Screenshots
              </h2>
              <div className={sectionClasses}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formData.screenshots.map((screenshot, index) => (
                    <div key={index} className="space-y-2">
                      <ImageUploadField
                        label={`Screenshot ${index + 1}`}
                        value={screenshot.url}
                        onChange={(e) => handleScreenshotChange(index, 'url', e.target.value)}
                        onUpload={(e) => handleImageUpload(e, 'screenshots')}
                        error={errors.screenshots && index === 0 ? errors.screenshots : ''}
                        required={index === 0}
                        previewClassName="h-40"
                      />
                      <input
                        type="text"
                        value={screenshot.caption}
                        onChange={(e) => handleScreenshotChange(index, 'caption', e.target.value)}
                        placeholder="Add a caption..."
                        className="w-full px-3 py-2 text-sm rounded-lg bg-[var(--bg-primary)] border border-[var(--accent-primary)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeScreenshot(index)}
                          className="mt-2 text-sm text-red-500 hover:text-red-600 transition-colors flex items-center"
                        >
                          <X size={16} className="mr-1" /> Remove Screenshot
                        </button>
                      )}
                    </div>
                  ))}
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={addScreenshot}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border border-[var(--accent-primary)]/20 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 transition-colors"
                    >
                      <Plus size={16} className="mr-2" /> Add Screenshot
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-[var(--accent-primary)]/10">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 rounded-lg border border-[var(--accent-primary)]/20 text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] transition-colors"
              >
                Reset Form
              </button>
              <button
                type="submit"
                disabled={isSubmitting || uploading}
                className={`px-6 py-3 rounded-lg bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary)]/90 transition-colors flex items-center justify-center ${
                  isSubmitting || uploading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting || uploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {uploading ? 'Creating Project...' : 'Creating Project'}
                  </>
                ) : (
                  'Create Project'
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DevVaultCreate;