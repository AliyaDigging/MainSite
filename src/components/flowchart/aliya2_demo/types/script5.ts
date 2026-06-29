export type L10nLang =
  | "zh-cn" // originally 'zh-CN'
  | "en-us"; // originally 'en'

/** for file: `all.json` */
export type L10nAllLangEntry = {
  documents: {
    title: Record<string, Record<L10nLang, string>>; // key is DocumentId; from 'Title zh-CN/en' field
    content: Record<string, Record<L10nLang, string>>; // key is DocumentId; from 'DocumentContent zh-CN/en'
  };
  news: {
    title: Record<string, Record<L10nLang, string>>; // key is NewsId; from 'Title zh-CN/en' field
    content: Record<string, Record<L10nLang, string>>; // key is NewsId; from 'NewsContent zh-CN/en'
  };
  conversations: {
    title: Record<string, Record<L10nLang, string>>; // key is conversationID; see `Articy_Conversation_Dialogue_Entry.fields`, field=Title
  };
  dialogues: Record<string, Record<L10nLang, string>>; // key is `${conversationID}_${dialogueId}`; from 'zh-CN' or 'en' field
};

/** for file: 'zh-cn.json', 'en-us.json', etc. */
export type L10nSingleLangEntry = {
  documents: {
    title: Record<string, string>; // key is DocumentId; from 'Title zh-CN/en' field
    content: Record<string, string>; // key is DocumentId; from 'DocumentContent zh-CN/en'
  };
  news: {
    title: Record<string, string>; // key is NewsId; from 'Title zh-CN/en' field
    content: Record<string, string>; // key is NewsId; from 'NewsContent zh-CN/en'
  };
  conversations: {
    title: Record<string, string>; // key is conversationID; see `Articy_Conversation_Dialogue_Entry.fields`, field=Title
  };
  dialogues: Record<string, string>; // key is `${conversationID}_${dialogueId}`; from 'zh-CN' or 'en' field
};
