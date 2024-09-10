import React, { createContext, useContext, useState, ReactNode } from 'react'

const ApiContext = createContext(undefined)

export const ApiProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleApiRequest = async (url, options = {}, optionUrl) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const responseData = await response.json()
      setData(responseData.data)
      setPage(responseData.page)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchData = (url) => handleApiRequest(url)

  const createData = async (url, payload, optionUrl) => {
    await handleApiRequest(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    fetchData(optionUrl || url)
  }

  const updateData = async (url, payload, optionUrl) => {
    await handleApiRequest(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    fetchData(optionUrl || url)
  }

  const deleteData = async (url, optionUrl) => {
    await handleApiRequest(url, {
      method: 'DELETE',
    })
    fetchData(optionUrl || url)
  }

  return <ApiContext.Provider value={{ data, page, loading, error, fetchData, createData, updateData, deleteData }}>{children}</ApiContext.Provider>
}

export const useApiContext = () => {
  const context = useContext(ApiContext)
  if (context === undefined) {
    throw new Error('useApiContext must be used within an ApiProvider')
  }
  return context
}
