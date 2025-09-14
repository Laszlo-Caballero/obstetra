export enum FileType {
  IMAGE = "image",
  VIDEO = "video",
  DOCUMENT = "document",
  UNKNOWN = "unknown",
}

export const typesExtension = [
  {
    type: FileType.IMAGE,
    extensions: ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"],
  },
  {
    type: FileType.VIDEO,
    extensions: ["mp4", "avi", "mov", "wmv", "flv", "mkv", "webm"],
  },
  {
    type: FileType.DOCUMENT,
    extensions: [
      "pdf",
      "doc",
      "docx",
      "xls",
      "xlsx",
      "ppt",
      "pptx",
      "txt",
      "odt",
      "ods",
      "odp",
    ],
  },
];

export function getFileType(extension: string) {
  for (const type of typesExtension) {
    if (type.extensions.includes(extension.toLowerCase())) {
      return type.type;
    }
  }
  return FileType.UNKNOWN;
}
