// useManga.js
import useSWR from 'swr'
import { fetchAll, fetchOne, createItem, updateItem, deleteItem } from './apiClient'

const endpoint = '/manga-list'

export const useMangas = () => {
  const { data, error, mutate } = useSWR(endpoint, fetchAll)
  return { data, error, mutate }
}

export const useManga = (id) => {
  const { data, error } = useSWR(id ? [`${endpoint}/${id}`, id] : null, fetchOne)
  return { data, error }
}

export const createManga = async (manga) => {
  const newManga = await createItem(endpoint, manga)
  return newManga
}

export const updateManga = async (id, updatedManga) => {
  const updated = await updateItem(endpoint, id, updatedManga)
  return updated
}

export const deleteManga = async (id) => {
  const deleted = await deleteItem(endpoint, id)
  return deleted
}
