export type L10nSingleLang_Ycytx5 = {
  story: Record<string, string>
  dict: Record<string, [string, string]>
}

export type VFOut_Catalog_Entry = {
  filename: string
  metadata: {
    counts: {
      node: number
      edge: number
      dictKeyword: number
    }
    dictKeywordId: string[]
    currName: string
    version: number
    specialNodes: {
      start: string[]
      end: string[]
    }
  }
  dayIndex: string[]
}

export type VFOut_Catalog_Ycytx5 = {
  catalog: Record<string, VFOut_Catalog_Entry>
}
