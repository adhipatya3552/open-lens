import { License } from "./media";

export interface UploadFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: "pending" | "uploading" | "success" | "error";
  error?: string;
  metadata: FileMetadata;
}

export interface FileMetadata {
  title: string;
  description: string;
  tags: string[];
  license: License;
  category: string;
  subcategory?: string;
  customCategory?: string;
  collectionId?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  itemCount: number;
}

// Mock collections for demonstration
export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: "favorites",
    name: "My Favorites",
    description: "Personal collection of favorite media",
    itemCount: 24,
  },
  {
    id: "nature",
    name: "Nature Photography",
    description: "Beautiful landscapes and wildlife",
    itemCount: 156,
  },
  {
    id: "urban",
    name: "Urban Exploration",
    description: "City life and architecture",
    itemCount: 89,
  },
  {
    id: "portraits",
    name: "Portrait Collection",
    description: "People and lifestyle photography",
    itemCount: 67,
  },
];

export const SUPPORTED_FORMATS = {
  image: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  video: ["video/mp4", "video/webm", "video/quicktime"],
};

export const CATEGORIES: Category[] = [
  {
    id: "nature",
    name: "Nature",
    description: "Landscapes, wildlife, and natural phenomena",
  },
  {
    id: "urban",
    name: "Urban",
    description: "City life, architecture, and street photography",
  },
  {
    id: "people",
    name: "People",
    description: "Portraits, lifestyle, and human interaction",
  },
  {
    id: "technology",
    name: "Technology",
    description: "Gadgets, software, and innovation",
  },
  {
    id: "abstract",
    name: "Abstract",
    description: "Conceptual and non-representational imagery",
  },
];

export const LICENSE_INFO: Record<License, { description: string }> = {
  "CC0": {
    description: "No Rights Reserved - Free for personal and commercial use, no attribution required",
  },
  "CC BY": {
    description: "Attribution Required - Free for personal and commercial use with attribution",
  },
  "CC BY-SA": {
    description: "Share-Alike - Free to use with attribution, derivatives must use the same license",
  },
  "CC BY-NC": {
    description: "Non-Commercial - Free for personal use with attribution, no commercial use",
  },
  "CC BY-ND": {
    description: "No Derivatives - Free to use with attribution, no modifications allowed",
  },
};
