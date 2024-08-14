export interface IArtist {
  id: number
  firstName: string
  lastName: string
  fullName?: string
}

export interface ICreateArtist {
  firstName: string
  lastName: string
}

export interface IUpdateArtist {
  firstName?: string
  lastName?: string
}
