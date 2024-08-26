import React, { createContext, useContext, useState, ReactNode } from 'react'

const ApiContext = createContext(undefined)

export const ApiProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchApi = async (url, options) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const data = await response.json()
      return data
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return <ApiContext.Provider value={{ fetchApi, loading, error }}>{children}</ApiContext.Provider>
}

export const useApiContext = () => {
  const context = useContext(ApiContext)
  if (context === undefined) {
    throw new Error('useApiContext must be used within an ApiProvider')
  }
  return context
}
