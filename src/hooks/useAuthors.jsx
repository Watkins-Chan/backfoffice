import { fetchAll } from 'api/apiClient'
import { CURRENT_PAGE, PAGE_SIZE } from 'constants'
import useSWR, { mutate } from 'swr'

const endpoint = '/authors'

export const useAuthors = (pageSize = PAGE_SIZE, currentPage = CURRENT_PAGE, q, sortBy, sortOrder = 'desc') => {
  const { data, error, isLoading, mutate } = useSWR([endpoint, pageSize, currentPage, q, sortBy, sortOrder], () =>
    fetchAll(endpoint, { pageSize, currentPage, q, sortBy, sortOrder }),
  )
  return { data, error, isLoading, mutate }
}
