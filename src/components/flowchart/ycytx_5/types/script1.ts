// --------------------------------------------------
// * STORY DATA (OUTPUT)
// --------------------------------------------------

export type JsonOut_StoryData_Shared = {
  day: string
  id: string
  delayTime: number
}

export type JsonOut_StoryData_SystemTimeline = JsonOut_StoryData_Shared & {
  type: 'SYSTEM_TIMELINE'
  photoId: string
  nextId: string
  text: string // L10N ID
}
export type JsonOut_StoryData_SystemStatusTips = JsonOut_StoryData_Shared & {
  type: 'SYSTEM_STATUS_TIPS'
  text: string // L10N ID
  logText: string | null // L10N ID
  wxScence: string | null // raw string
  nextId: string
}
export type JsonOut_StoryData_ChoiceText = JsonOut_StoryData_Shared & {
  choicesList: {
    text: string // L10N ID
    nextId: string
  }[]
  type: 'CHOICE_TEXT'
}
export type JsonOut_StoryData_MikoText = JsonOut_StoryData_Shared & {
  text: string // L10N ID
  logText: string | null // L10N ID
  dictId: string | null
  nextId: string
  requirement: string | null
  type: 'MIKO_TEXT'
}
export type JsonOut_StoryData_MikoPhoto = JsonOut_StoryData_Shared & {
  logText: string | null //L10N ID
  photoId: string
  type: 'MIKO_PHOTO'
}
export type JsonOut_StoryData_GameBE = JsonOut_StoryData_Shared & {
  text: string // L10N ID
  wxScence: string
  type: 'GAME_BE'
}
export type JsonOut_StoryData_GameHE = JsonOut_StoryData_Shared & {
  text: string // L10N ID
  wxScence: string
  nextId: string
  type: 'GAME_HE'
}
export type JsonOut_StoryData_GameEnd = JsonOut_StoryData_Shared & {
  text: string // L10N ID
  wxScence: string
  type: 'GAME_END'
}

export type JsonOut_StoryDataEntry =
  | JsonOut_StoryData_SystemTimeline
  | JsonOut_StoryData_SystemStatusTips
  | JsonOut_StoryData_ChoiceText
  | JsonOut_StoryData_MikoText
  | JsonOut_StoryData_MikoPhoto
  | JsonOut_StoryData_GameBE
  | JsonOut_StoryData_GameHE
  | JsonOut_StoryData_GameEnd

export type JsonOut_DictDataEntry = {
  id: string
  l10nId: string // L10N ID
}

export type JsonOutData = {
  metadata: {
    version: number
    storyId: string
  }
  story: Record<string, JsonOut_StoryDataEntry>
  dayIndex: Record<string, string>
  dict: Record<string, JsonOut_DictDataEntry>
}

export type JsonOutL10nData = {
  story: Record<string, string>
  dict: Record<string, [string, string]>
}
