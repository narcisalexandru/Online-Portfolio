export interface IArtwork {
  id: number
  title: string
  description: string
  imageUrl: string
  websiteLink: string
  artistId: number
}

export interface ICreateArtwork {
  title: string
  description: string
  imageUrl: string
  websiteLink: string
  artistId: number
}

export interface IUpdateArtwork extends ICreateArtwork {
  id: number
}
