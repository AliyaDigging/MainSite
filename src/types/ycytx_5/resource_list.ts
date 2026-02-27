type CommonSingleFileEntry = { filename: string; url: string }

export type Ycytx5_ResourceList = {
  images: {
    chapter_cover: CommonSingleFileEntry[]
    feed_avater: CommonSingleFileEntry[]
    story_images: [CommonSingleFileEntry, CommonSingleFileEntry][]
    chat_background: CommonSingleFileEntry[]
    chat_background_new: CommonSingleFileEntry[]
    guide_image: CommonSingleFileEntry[]
    splash_screen: CommonSingleFileEntry[]
  }
  music: CommonSingleFileEntry[]
}
