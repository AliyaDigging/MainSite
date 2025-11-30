export type AllDataCatalogEntry = {
  metadata: {
    id: string
    platform: {
      type: 'pc' | 'android' | 'ios'
      seller: 'steam' | 'taptap' | 'bilibili'
      url: string
    }
  }
  versions: {
    id: string
    update_time: string
    extra_info: string
  }[]
}

export type AllDataCatalog = AllDataCatalogEntry[]
