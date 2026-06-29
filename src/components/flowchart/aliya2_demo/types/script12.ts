export type FlowchartCatalogListManifest_Entry = {
  id: string; // flowchart id
  title: string; // flowchart title
  channelId: string; // channel id, if null then stringify to "null"
};

export type FlowchartCatalogListManifest = Record<
  string, // key is flowchart filename, without `.json` extension
  FlowchartCatalogListManifest_Entry
>;
