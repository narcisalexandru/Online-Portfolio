export const formatArtists = (
  artists: Array<{ firstName: string; lastName: string; id: number }>
) => {
  return artists.map((artist) => ({
    ...artist,
    fullName: `${artist.firstName} ${artist.lastName}`
  }))
}
