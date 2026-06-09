// Determine API base URL based on environment
const getApiBase = () => {
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:5000/api'
  }
  // For production, use relative path or set your backend URL here
  // This assumes your backend is deployed alongside your frontend
  // or update with your production backend URL
  return '/api' // relative path for same-origin requests
}

const API_BASE = getApiBase()

export const apiClient = {
  async request(endpoint, options = {}, token = null) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    }
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed')
    }
    
    return data
  },

  // Admin endpoints
  admin: {
    async getUsers(token) {
      return apiClient.request('/admin/users', {}, token)
    },
    async deleteUser(userId, token) {
      return apiClient.request(`/admin/users/${userId}`, { method: 'DELETE' }, token)
    },
    async toggleAdmin(userId, token) {
      return apiClient.request(`/admin/users/${userId}/toggle-admin`, { method: 'PUT' }, token)
    },
    async getLogs(token) {
      return apiClient.request('/admin/logs', {}, token)
    }
  },

  // Auth endpoints
  auth: {
    async me(token) {
      return apiClient.request('/auth/me', {}, token)
    }
  }
}
