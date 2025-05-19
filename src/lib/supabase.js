import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials. Please check your environment variables.')
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper functions for projects
export const projectsApi = {
  // Create a new project
  async createProject(projectData) {
    const { data, error } = await supabase
      .from('projects')
      .insert([projectData])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Get all projects
  async getProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get a single project by ID
  async getProject(id) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Update a project
  async updateProject(id, updates) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete a project
  async deleteProject(id) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Helper functions for articles
export const articlesApi = {
  // Create a new article
  async createArticle(articleData) {
    try {
      const { data, error } = await supabase
        .from('articles')
        .insert([{
          ...articleData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating article:', error)
      throw error
    }
  },

  // Get all articles
  async getArticles() {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching articles:', error)
      return []
    }
  },

  // Get a single article by ID
  async getArticle(id) {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching article:', error)
      return null
    }
  },

  // Update an article
  async updateArticle(id, updates) {
    try {
      const { data, error } = await supabase
        .from('articles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating article:', error)
      throw error
    }
  },

  // Delete an article
  async deleteArticle(id) {
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    } catch (error) {
      console.error('Error deleting article:', error)
      throw error
    }
  }
}

// Helper functions for file uploads
export const storageApi = {
  // Upload a file to a specific bucket
  async uploadFile(bucket, file, path) {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .upload(path, file)
      
      if (error) throw error
    } catch (error) {
      console.error('Error uploading file:', error)
      throw error
    }
  },

  // Get public URL for a file
  getPublicUrl(bucket, path) {
    try {
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(path)
      return data.publicUrl
    } catch (error) {
      console.error('Error getting public URL:', error)
      return null
    }
  },

  // Delete a file
  async deleteFile(bucket, path) {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path])
      
      if (error) throw error
    } catch (error) {
      console.error('Error deleting file:', error)
      throw error
    }
  }
} 