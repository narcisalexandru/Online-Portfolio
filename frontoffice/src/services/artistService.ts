import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api/artists'

export const getArtists = async () => {
  try {
    const response = await axios.get(BASE_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching artists:', error)
    throw error
  }
}

export const getArtistById = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching artist by id:', error)
    throw error
  }
}

export const createArtist = async (artistData: any) => {
  try {
    const response = await axios.post(BASE_URL, artistData)
    return response.data
  } catch (error) {
    console.error('Error creating artist:', error)
    throw error
  }
}

export const updateArtist = async (id: number, artistData: any) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${id}`, artistData)
    return response.data
  } catch (error) {
    console.error('Error updating artist:', error)
    throw error
  }
}

export const deleteArtist = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting artist:', error)
    throw error
  }
}
