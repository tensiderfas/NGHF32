export interface Artist {
  id: string;
  name: string;
  role: string;
  genre: string;
  bio: string;
  image: string;
  spotify?: string;
  instagram?: string;
  featured?: boolean;
  createdAt: string;
}

export interface Partner {
  id: string;
  name: string;
  letter: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
}

export interface Application {
  id: string;
  name: string;
  email: string;
  type: "label" | "distribution" | "both";
  links: string;
  message: string;
  status: "new" | "reviewed" | "accepted" | "rejected";
  createdAt: string;
}

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  email: string;
  telegram: string;
  instagram: string;
  youtube: string;
}

export interface AdminState {
  artists: Artist[];
  partners: Partner[];
  news: NewsItem[];
  applications: Application[];
  settings: SiteSettings;
  isAuthenticated: boolean;
}
