export interface ChatImageItem {
  alt: string;
  id: string;
  url: string;
  fileType?: string;
  pathUrl?: string;
}

export interface ChatImageChunk {
  data: string;
  id: string;
  isBase64?: boolean;
}
