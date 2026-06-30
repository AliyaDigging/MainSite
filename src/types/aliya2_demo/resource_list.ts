type ResourceEntry = {
  name: string // full filename (with extension)
  path: string // absolute path (starting with `/aliya/aliya2_demo/...`)
}

/** Based on /aliya/aliya2_demo directory structure */
export type ResourceList_Aliya2Demo = {
  image: {
    avatar: {
      actor: ResourceEntry[]
      channel: ResourceEntry[]
    }
    cg: ResourceEntry[]
    emoji: ResourceEntry[]
  }
  audio: {
    bgm: ResourceEntry[]
    sfx: ResourceEntry[]
  }
}
