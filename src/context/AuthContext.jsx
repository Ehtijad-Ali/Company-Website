import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Determine API base URL based on environment
const getApiBase = () => {
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:5000/api'
  }
  // For production, use relative path
  return '/api'
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [apiBase] = useState(getApiBase())

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('auth_user')
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    setError(null)
    setLoading(true)
    try {
      const response = await fetch(`${apiBase}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      
      const data = await response.json()
      if (!response.ok) {
        const errorMsg = data.message || 'Login failed'
        throw new Error(errorMsg)
      }
      
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('auth_user', JSON.stringify(data.user))
      setUser(data.user)
      setLoading(false)
      return data
    } catch (err) {
      const errorMsg = err.message || 'Login failed'
      setError(errorMsg)
      setLoading(false)
      throw err
    }
  }

  const register = async (username, email, password) => {
    setError(null)
    setLoading(true)
    try {
      const response = await fetch(`${apiBase}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      })
      
      const data = await response.json()
      if (!response.ok) {
        const errorMsg = data.message || 'Registration failed'
        throw new Error(errorMsg)
      }
      
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('auth_user', JSON.stringify(data.user))
      setUser(data.user)
      setLoading(false)
      return data
    } catch (err) {
      const errorMsg = err.message || 'Registration failed'
      setError(errorMsg)
      setLoading(false)
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    setUser(null)
    setError(null)
  }

  const getToken = () => localStorage.getItem('auth_token')

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    getToken,
    isAuthenticated: !!user,
    isAdmin: user?.is_admin || false
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
