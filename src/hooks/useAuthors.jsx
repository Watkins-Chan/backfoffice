import { fetchAll } from 'api/apiClient'
import useSWR, { mutate } from 'swr'

const endpoint = '/authors'

export const useAuthors = (pageSize = 10, currentPage = 1, q, sortBy, sortOrder = 'desc') => {
  const { data, error, isLoading, mutate } = useSWR([endpoint, pageSize, currentPage, q, sortBy, sortOrder], () =>
    fetchAll(endpoint, { pageSize, currentPage, q, sortBy, sortOrder }),
  )
  return { data, error, isLoading, mutate }
}
