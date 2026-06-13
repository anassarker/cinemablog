export interface DownloadLink {
  label: string;
  url: string;
}

export interface DownloadLinks {
  '480p': DownloadLink[];
  '720p': DownloadLink[];
  '1080p': DownloadLink[];
  '4K': DownloadLink[];
  [key: string]: DownloadLink[];
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  category: string;
  tags: string[];
  genre: string;
  year: string;
  language: string;
  quality: string;
  rating: string;
  director: string;
  cast: string;
  duration: string;
  size: string;
  downloadLinks: DownloadLinks;
  status: 'published' | 'draft';
  views: number;
  featured: boolean;
  metaTitle: string;
  metaDescription: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  publishedAt: Date | null;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}
