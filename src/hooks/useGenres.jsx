// useGenres.js
import useSWR from 'swr'
import { fetchAll, fetchOne, createItem, updateItem, deleteItem } from './apiClient'

const endpoint = '/genres'

export const useGenres = () => {
  const { data, error, mutate } = useSWR(endpoint, fetchAll)
  return { data, error, mutate }
}

export const useGenre = (id) => {
  const { data, error } = useSWR(id ? [`${endpoint}/${id}`, id] : null, fetchOne)
  return { data, error }
}

export const createGenre = async (genre) => {
  const newGenre = await createItem(endpoint, genre)
  return newGenre
}

export const updateGenre = async (id, updatedGenre) => {
  const updated = await updateItem(endpoint, id, updatedGenre)
  return updated
}

export const deleteGenre = async (id) => {
  const deleted = await deleteItem(endpoint, id)
  return deleted
}
