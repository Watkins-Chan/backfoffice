import { useState } from 'react'

export const useApi = (apiFunction) => {
  const [isLoading, setIsLoading] = useState(false)

  const execute = async (...args) => {
    setIsLoading(true)
    try {
      const result = await apiFunction(...args)
      return result
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { execute, isLoading }
}
