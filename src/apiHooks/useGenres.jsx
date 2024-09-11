// useGenres.js
import useSWR, { mutate } from 'swr'
import { fetchAll, fetchOne, createItem, updateItem, deleteItem } from 'api/apiClient'
import { useAlert } from 'contexts/AlertContent'
import { useApi } from 'customHooks/useApi'

const endpoint = '/genres'

export const useGenres = (pageSize = 10, currentPage = 1) => {
  const { data, error, mutate } = useSWR([endpoint, pageSize, currentPage], () => fetchAll(endpoint, { pageSize, currentPage }))
  return { data, error, mutate }
}

export const useGenre = (id) => {
  const { data, error } = useSWR(id ? `${endpoint}/${id}` : null, fetchOne)
  return { data, error }
}

export const useCreateGenre = () => {
  const { execute, isLoading } = useApi((genre) => createItem(endpoint, genre))
  const alert = useAlert()

  const createGenre = async (genre) => {
    try {
      const newGenre = await execute(genre)
      mutate(endpoint)
      alert('Genre created successfully!', 'success')
      return newGenre
    } catch (error) {
      alert('Failed to create genre.', 'error')
      throw error
    }
  }

  return { createGenre, isLoading }
}

export const useUpdateGenre = () => {
  const { execute, isLoading } = useApi((id, updatedGenre) => updateItem(endpoint, id, updatedGenre))
  const alert = useAlert()

  const updateGenre = async (id, updatedGenre) => {
    try {
      const updated = await execute(id, updatedGenre)
      mutate(endpoint)
      alert('Genre updated successfully!', 'success')
      return updated
    } catch (error) {
      alert('Failed to update genre.', 'error')
      throw error
    }
  }

  return { updateGenre, isLoading }
}

export const useDeleteGenre = () => {
  const { execute, isLoading } = useApi((id) => deleteItem(endpoint, id))
  const alert = useAlert()

  const deleteGenre = async (id) => {
    try {
      const deleted = await execute(id)
      mutate(endpoint)
      alert('Genre deleted successfully!', 'success')
      return deleted
    } catch (error) {
      alert('Failed to delete genre.', 'error')
      throw error
    }
  }

  return { deleteGenre, isLoading }
}
