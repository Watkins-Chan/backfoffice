import React, { createContext, useContext, useState, ReactNode } from 'react'

const ApiContext = createContext(undefined)

export const ApiProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async (url) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const data = await response.json()
      setData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createData = async (url, payload, optionUrl) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      await fetchData(optionUrl || url)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return <ApiContext.Provider value={{ data, loading, error, fetchData, createData }}>{children}</ApiContext.Provider>
}

export const useApiContext = () => {
  const context = useContext(ApiContext)
  if (context === undefined) {
    throw new Error('useApiContext must be used within an ApiProvider')
  }
  return context
}
