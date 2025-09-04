export type MediaType = "photo" | "video";
export type License = "CC0" | "CC BY" | "CC BY-SA" | "CC BY-NC" | "CC BY-ND";
export type Orientation = "landscape" | "portrait" | "square";
export type Resolution = "4K" | "2K" | "HD" | "SD";

export interface MediaItem {
  id: string;
  type: MediaType;
  title: string;
  description?: string;
  creator: {
    id: string;
    name: string;
    avatar: string;
    bio?: string;
    followers?: number;
  };
  thumbnail: string;
  fullUrl: string;
  url: string; // URL for the current size/quality
  mimeType: string;
  license: License;
  orientation: Orientation;
  resolution: Resolution;
  dimensions: {
    width: number;
    height: number;
  };
  fileSize: number;
  tags: string[];
  views: number;
  downloads: number;
  favorited: boolean;
  createdAt: string;
  exif?: {
    camera?: string;
    lens?: string;
    focalLength?: string;
    shutterSpeed?: string;
    aperture?: string;
    iso?: number;
  };
}

export interface FilterOptions {
  type?: MediaType;
  license?: License;
  orientation?: Orientation;
  resolution?: Resolution;
}

// Mock data generator for development
export function generateMockMediaItems(count: number): MediaItem[] {
  const types: MediaType[] = ["photo", "video"];
  const licenses: License[] = ["CC0", "CC BY", "CC BY-SA", "CC BY-NC", "CC BY-ND"];
  const orientations: Orientation[] = ["landscape", "portrait", "square"];
  const resolutions: Resolution[] = ["4K", "2K", "HD", "SD"];

  return Array.from({ length: count }, (_, i) => ({
    id: `media-${i}`,
    type: types[Math.floor(Math.random() * types.length)],
    title: `Sample Media ${i + 1}`,
    description: `This is a sample description for media item ${i + 1}. It showcases the beauty of nature, architecture, or other interesting subjects.`,
    creator: {
      id: `creator-${i % 10}`,
      name: `Creator ${i % 10}`,
      avatar: `https://i.pravatar.cc/150?u=${i % 10}`,
      bio: "Professional photographer and digital artist",
      followers: Math.floor(Math.random() * 10000),
    },
    thumbnail: `https://picsum.photos/seed/${i}/400/300`,
    fullUrl: `https://picsum.photos/seed/${i}/1920/1080`,
    url: `https://picsum.photos/seed/${i}/1280/720`,
    mimeType: "image/jpeg",
    license: licenses[Math.floor(Math.random() * licenses.length)],
    orientation: orientations[Math.floor(Math.random() * orientations.length)],
    resolution: resolutions[Math.floor(Math.random() * resolutions.length)],
    dimensions: {
      width: 1920,
      height: 1080,
    },
    fileSize: Math.floor(Math.random() * 10000000),
    tags: ["nature", "landscape", "photography"],
    views: Math.floor(Math.random() * 10000),
    downloads: Math.floor(Math.random() * 1000),
    favorited: Math.random() > 0.5,
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    exif: {
      camera: "Canon EOS R5",
      lens: "RF 24-70mm f/2.8L IS USM",
      focalLength: "50mm",
      shutterSpeed: "1/200",
      aperture: "f/2.8",
      iso: 100,
    },
  }));
}
