import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useUpdateParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const updateParams = useCallback(
    (newParams) => {
      const urlParams = new URLSearchParams(searchParams)
      Object.entries(newParams).forEach(([key, value]) => urlParams.set(key, value))
      setSearchParams(urlParams)
    },
    [searchParams, setSearchParams],
  )

  return updateParams
}
