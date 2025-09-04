import { MediaItem } from "./media";

export type Badge = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type UserStats = {
  uploads: number;
  downloads: number;
  views: number;
  followers: number;
  following: number;
};

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  isVerified: boolean;
  isCreator: boolean;
  badges: Badge[];
  stats: UserStats;
  joinedDate: string;
  socialLinks: {
    website?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
  };
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  cover: string;
  itemCount: number;
  isPublic: boolean;
  createdAt: string;
}

export interface AnalyticsData {
  dailyViews: {
    date: string;
    views: number;
  }[];
  dailyDownloads: {
    date: string;
    downloads: number;
  }[];
  popularContent: {
    item: MediaItem;
    views: number;
    downloads: number;
  }[];
  topCountries: {
    country: string;
    views: number;
    downloads: number;
  }[];
}
