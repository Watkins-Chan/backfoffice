import { createItem, deleteItem, fetchAll, fetchOne, updateItem, uploadFile } from 'api/apiClient'
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

export const useManga = (id) => {
  const { data, error } = useSWR(id ? `${endpoint}/${id}` : null, fetchOne)
  return { data, error }
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

export const useCreateManga = () => {
  const { execute, isLoading } = useApi((manga) => createItem(endpoint, manga))
  const alert = useAlert()

  const createManga = async (manga) => {
    try {
      const newManga = await execute(manga)
      alert('Manga created successfully!', 'success')
      return newManga
    } catch (error) {
      alert('Failed to create manga.', 'error')
      throw error
    }
  }

  return { createManga, isLoading }
}

export const useUpdateManga = () => {
  const { execute, isLoading } = useApi((id, updatedManga) => updateItem(endpoint, id, updatedManga))
  const alert = useAlert()

  const updateManga = async (id, updatedManga) => {
    try {
      const updated = await execute(id, updatedManga)
      mutate(endpoint)
      alert('Manga updated successfully!', 'success')
      return updated
    } catch (error) {
      alert('Failed to update manga.', 'error')
      throw error
    }
  }

  return { updateManga, isLoading }
}

export const useDeleteManga = () => {
  const { execute, isLoading } = useApi((id) => deleteItem(endpoint, id))
  const alert = useAlert()

  const deleteManga = async (id) => {
    try {
      const deleted = await execute(id)
      mutate(endpoint)
      alert('Manga deleted successfully!', 'success')
      return deleted
    } catch (error) {
      alert('Failed to delete manga.', 'error')
      throw error
    }
  }

  return { deleteManga, isLoading }
}
