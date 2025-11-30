export type ResourceMusicEntry = {
  filename: string
  url: string
}

export type ResourceMusic = ResourceMusicEntry[]

export type ResourceImagesEntry = {
  filename: string
  url: string
}

export type ResourceImages = ResourceImagesEntry[]

export type Aliya1_ResourceList = {
  images: ResourceImages
  music: ResourceMusic
}
