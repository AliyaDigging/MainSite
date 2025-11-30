export const ELangcode = {
  "en-us": "en-us",
  "zh-cn": "zh-cn",
  "zh-cn-c": "zh-cn-c",
} as const;
export type ELangcode = (typeof ELangcode)[keyof typeof ELangcode];

export type L10nCsvSingleLangEntry = string;
export type L10nCsvSingleLang = Record<string, L10nCsvSingleLangEntry>;

export type L10nCsvAllLangEntry = Record<ELangcode, string>;
export type L10nCsvAllLang = Record<string, L10nCsvAllLangEntry>;
