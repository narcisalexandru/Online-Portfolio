import axios from 'axios'
import type { IArtwork, ICreateArtwork, IUpdateArtwork } from '@/interfaces/IArtworks'

const BASE_URL = 'http://localhost:3000/api/artworks'

export const getAllArtworks = async () => {
  try {
    const response = await axios.get(BASE_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching artworks:', error)
    throw error
  }
}

export const getAllArtworksByArtistIds = async (artistIds: number[]) => {
  try {
    const artistIdsParam = artistIds.join(',')
    const response = await axios.get(BASE_URL, {
      params: { artistIds: artistIdsParam }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching artworks by artist IDs:', error)
    throw error
  }
}

export const getArtworkById = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching artwork with ID ${id}:`, error)
    throw error
  }
}

export const createArtwork = async (artwork: ICreateArtwork): Promise<IArtwork> => {
  const response = await fetch('http://localhost:3000/api/artworks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(artwork)
  })

  if (!response.ok) {
    throw new Error('Failed to create artwork')
  }

  return response.json()
}

export const updateArtwork = async (id: number, artworkData: any) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${id}`, artworkData)
    return response.data
  } catch (error) {
    console.error(`Error updating artwork with ID ${id}:`, error)
    throw error
  }
}

export const deleteArtwork = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting artwork with ID ${id}:`, error)
    throw error
  }
}
