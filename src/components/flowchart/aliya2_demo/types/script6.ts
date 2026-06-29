/**
 * ALL OF THE DATA BELOW, IF NOT SPECIFIED, ARE DIRECTLY
 * COMING FROM `data/_temp/raw_all_yaml_2.json`
 */

/**
 * from AmbientMessageConfig[0].raw.ambientMessages
 */
export type AmbientMessageConfig_Entry = {
  id: string; // if null, do `NULL`
  color: { r: number; g: number; b: number; a: number };
};
export type AmbientMessageConfig = Record<
  string | "NULL",
  AmbientMessageConfig_Entry
>;

/**
 * from AudioConfig[0].raw.audioDefinitions
 */
export const AudioConfig_Entry_Category = {
  BGM: 0,
  SFX: 1,
} as const;
export type AudioConfig_Entry_Category =
  (typeof AudioConfig_Entry_Category)[keyof typeof AudioConfig_Entry_Category];
export type AudioConfig_Entry = {
  key: string;
  category: AudioConfig_Entry_Category;

  /** 读取 ingame_data/known_mapping/audio.json 手动 mapping
   * - 文件类型 Record<string, string> // key is audioKey
   * - clipFilename 即为 key-value pair 的 value
   */
  clipFilename: string;

  defaultVolume: number;
  loop: boolean;
  fadeInSeconds: number;
  fadeOutSeconds: number;
};
export type AudioConfig = Record<string, AudioConfig_Entry>; // key is `audioKey`

/**
 * from ChatConfig[0].raw.channelDefinitions
 */
export const ChatConfig_Channel_ChannelType = {
  Single: 0,
  Multi: 1,
} as const;
export type ChatConfig_Channel_ChannelType =
  (typeof ChatConfig_Channel_ChannelType)[keyof typeof ChatConfig_Channel_ChannelType];

export type ChatConfig_Channel_Entry = {
  id: string; // channelId
  name: {
    "zh-cn": string; // displayNameZhCN
    "en-us": string; // displayNameEn
  };

  /** 读取 ingame_data/known_mapping/image.json 手动 mapping
   * - 文件类型 Record<string, string>
   * - key format: `Channel_${channelId}`
   * - avatarFilename 即为 key-value pair 的 value
   */
  avatarFilename: string;

  channelType: ChatConfig_Channel_ChannelType;
  startConversation: {
    title: string; // startTitle

    /** The conversationId can be reverse traced back via the
     * localization file `L10nSingleLangEntry.conversation`'s value's
     * corresponding key.
     */
    conversationId: string;
  };
  beginningAtFirst: boolean;
};
export type ChatConfig_Channel = Record<string, ChatConfig_Channel_Entry>; // key is channelId

/**
 * from ChatConfig[0].raw.actorProfiles
 */
export type ChatConfig_Actor_Entry = {
  name: string; // actorName

  /** 读取 ingame_data/known_mapping/image.json 手动 mapping
   * - 文件类型 Record<string, string> // key is avatar.fileID
   * - key format: `Actor_${actorName}`
   * - avatarFilename 即为 key-value pair 的 value
   */
  avatarFilename: string;
};

export type ChatConfig = {
  channels: Record<string, ChatConfig_Channel_Entry>; // key is channelId
  actors: Record<string, ChatConfig_Actor_Entry>; // key is actorName
};

/**
 * from MediaMessageConfig[0].raw.imageAssets
 */
export type MediaMessageConfig_Image_Entry = {
  id: string;

  /** 读取 ingame_data/known_mapping/image.json 手动 mapping
   * - 文件类型 Record<string, string> // key is avatar.fileID
   * - key format: `CG_${actorName}`
   * - avatarFilename 即为 key-value pair 的 value
   */
  imageFilename: string;
};

/**
 * from MediaMessageConfig[0].raw.imageAssets
 */
export type MediaMessageConfig_Emoji_Entry = {
  id: string;

  /** 读取 ingame_data/known_mapping/image.json 手动 mapping
   * - 文件类型 Record<string, string> // key is avatar.fileID
   * - key format: `Emoji_${actorName}`
   * - avatarFilename 即为 key-value pair 的 value
   */
  imageFilename: string;
};

export type MediaMessageConfig = {
  images: Record<string, MediaMessageConfig_Image_Entry>; // key is id
  emojis: Record<string, MediaMessageConfig_Emoji_Entry>; // key is id
};

/**
 * from SearchConfig[0].raw.documentSearchEntries
 */
export type SearchConfig_Search_Entry = {
  keywords: {
    "zh-cn": string[]; // extracted from `documentSearchEntries[number].keywords[number].keywordZhCN`
    "en-us": string[]; // extracted from `documentSearchEntries[number].keywords[number].keywordEn`
  };
  documentIds: string[]; // documentIds
};

export type ExternalConfig = {
  ambientMessage: AmbientMessageConfig;
  audioConfig: AudioConfig;
  chatConfig: ChatConfig;
  mediaMessageConfig: MediaMessageConfig;
  searchConfig: SearchConfig_Search_Entry[];
};
