import { fetchAll, uploadFile } from 'api/apiClient'
import { MANGA_PAGE_SIZE, CURRENT_PAGE } from 'constants'
import { useAlert } from 'contexts/AlertContent'
import { useApi } from 'customHooks/useApi'
import useSWR, { mutate } from 'swr'

const endpoint = '/mangas'

export const useMangas = (pageSize = MANGA_PAGE_SIZE, currentPage = CURRENT_PAGE, q, sortBy, sortOrder = 'desc') => {
  const { data, error, isLoading, mutate } = useSWR([endpoint, pageSize, currentPage, q, sortBy, sortOrder], () =>
    fetchAll(endpoint, { pageSize, currentPage, q, sortBy, sortOrder }),
  )
  return { data, error, isLoading, mutate }
}

export const useUploadMangas = () => {
  const { execute, isLoading } = useApi((file) => uploadFile(`${endpoint}/upload`, file))
  const alert = useAlert()

  const uploadMangas = async (file) => {
    try {
      const result = await execute(file)
      alert('Mangas uploaded successfully!', 'success')
      return result
    } catch (error) {
      alert('Failed to upload Mangas.', 'error')
      throw error
    }
  }

  return { uploadMangas, isLoading }
}
