/**
 * ALL OF THE DATA BELOW ARE DERIVED FROM
 * `data/parsed/aliya2_flowchart.json`,
 * see `src/types/script2.ts` for more info
 * on type `Articy_Data`.
 */

/**
 * FOR Actor DATA, SAVE TO `data/external_index/actors.json`
 */
export type Actor_Entry = {
  /**
   * ALL OF THE DATA OF THE KEYS/FIELDS
   * ARE FROM `Articy_Actor_Entry.fields`
   */
  id: string;
  name: {
    "en-us": string; // "Name en" if possible, otherwise "Name"
    "zh-cn": string; // "Name zh-CN"
  };
  description: string; // Description; if null then empty string
  isPlayer: boolean; // IsPlayer
  articyId: string; // "Articy Id"
  technicalName: string; // "Technical Name"
  isNPC: boolean; // IsNPC
};
export type ActorData = Record<string, Actor_Entry>; // key is `id`

/**
 * FOR Item DATA, SAVE TO `data/external_index/items.json`
 */
export type Item_Entry = {
  /**
   * ALL OF THE DATA OF THE KEYS/FIELDS
   * ARE FROM `Articy_Item_Entry.fields`
   */
  name: {
    "en-us": string; // "Name en" if possible, otherwise "Name"
    "zh-cn": string; // "Name zh-CN"
  };
  description: string; // Description; if null then empty string

  isItem: boolean;

  /** to auto-detect:
   * - 'Document' if `DocumentId` in the fields
   * - 'News' if `NewsId` in the fields
   */
  type: "Document" | "News";
};
export type ItemData = {
  news: Record<string, Item_Entry>;
  documents: Record<string, Item_Entry>;
};

/**
 * FOR Variable DATA, SAVE TO `data/external_index/variables.json`
 */
export type Variable_Entry = {
  /**
   * ALL OF THE DATA OF THE KEYS/FIELDS
   * ARE FROM `Articy_Item_Entry.fields`
   */
  name: string; // "Name"
  initValue: unknown; // "Initial Value"
  type: string; // auto-detect from "Initial Value"; try type-narrowing to specific JS native type
};
export type VariableData = Record<string, Variable_Entry>; // key is "Name"
