import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  AdminState,
  Application,
  Artist,
  NewsItem,
  Release,
  SiteSettings,
} from "../types";
import {
  DEFAULT_ARTISTS,
  DEFAULT_NEWS,
  DEFAULT_RELEASES,
  DEFAULT_SETTINGS,
} from "../data/defaultData";

const STORAGE_KEY = "nv_cms_v1";
const AUTH_KEY = "nv_session_v1";
const ADMIN_PASS = "nightvolt2025";

interface StoreContextValue extends AdminState {
  login: (password: string) => boolean;
  logout: () => void;
  addArtist: (artist: Omit<Artist, "id" | "createdAt">) => void;
  updateArtist: (id: string, data: Partial<Artist>) => void;
  deleteArtist: (id: string) => void;
  addRelease: (release: Omit<Release, "id">) => void;
  updateRelease: (id: string, data: Partial<Release>) => void;
  deleteRelease: (id: string) => void;
  addNews: (item: Omit<NewsItem, "id">) => void;
  updateNews: (id: string, data: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;
  addApplication: (app: Omit<Application, "id" | "createdAt" | "status">) => void;
  updateApplication: (id: string, data: Partial<Application>) => void;
  deleteApplication: (id: string) => void;
  updateSettings: (data: Partial<SiteSettings>) => void;
  getArtist: (id: string) => Artist | undefined;
  getRelease: (id: string) => Release | undefined;
  getNews: (id: string) => NewsItem | undefined;
}

const StoreContext = createContext<StoreContextValue | null>(null);

function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}_${Date.now().toString(36)}`;
}

function loadState(): Omit<AdminState, "isAuthenticated"> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        artists: parsed.artists ?? DEFAULT_ARTISTS,
        releases: parsed.releases ?? DEFAULT_RELEASES,
        news: parsed.news ?? DEFAULT_NEWS,
        applications: parsed.applications ?? [],
        settings: { ...DEFAULT_SETTINGS, ...(parsed.settings ?? {}) },
      };
    }
  } catch {
    /* ignore */
  }
  return {
    artists: DEFAULT_ARTISTS,
    releases: DEFAULT_RELEASES,
    news: DEFAULT_NEWS,
    applications: [],
    settings: DEFAULT_SETTINGS,
  };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const initial = loadState();
  const [artists, setArtists] = useState<Artist[]>(initial.artists);
  const [releases, setReleases] = useState<Release[]>(initial.releases);
  const [news, setNews] = useState<NewsItem[]>(initial.news);
  const [applications, setApplications] = useState<Application[]>(
    initial.applications
  );
  const [settings, setSettings] = useState<SiteSettings>(initial.settings);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const payload = { artists, releases, news, applications, settings };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* ignore */
    }
  }, [artists, releases, news, applications, settings]);

  const value = useMemo<StoreContextValue>(
    () => ({
      artists,
      releases,
      news,
      applications,
      settings,
      isAuthenticated,
      login: (password: string) => {
        if (password === ADMIN_PASS) {
          setIsAuthenticated(true);
          try {
            sessionStorage.setItem(AUTH_KEY, "1");
          } catch {
            /* ignore */
          }
          return true;
        }
        return false;
      },
      logout: () => {
        setIsAuthenticated(false);
        try {
          sessionStorage.removeItem(AUTH_KEY);
        } catch {
          /* ignore */
        }
      },
      addArtist: (artist) => {
        setArtists((prev) => [
          {
            ...artist,
            id: uid("a"),
            createdAt: new Date().toISOString().slice(0, 10),
          },
          ...prev,
        ]);
      },
      updateArtist: (id, data) => {
        setArtists((prev) =>
          prev.map((a) => (a.id === id ? { ...a, ...data } : a))
        );
      },
      deleteArtist: (id) => {
        setArtists((prev) => prev.filter((a) => a.id !== id));
      },
      addRelease: (release) => {
        setReleases((prev) => [{ ...release, id: uid("r") }, ...prev]);
      },
      updateRelease: (id, data) => {
        setReleases((prev) =>
          prev.map((r) => (r.id === id ? { ...r, ...data } : r))
        );
      },
      deleteRelease: (id) => {
        setReleases((prev) => prev.filter((r) => r.id !== id));
      },
      addNews: (item) => {
        setNews((prev) => [{ ...item, id: uid("n") }, ...prev]);
      },
      updateNews: (id, data) => {
        setNews((prev) =>
          prev.map((n) => (n.id === id ? { ...n, ...data } : n))
        );
      },
      deleteNews: (id) => {
        setNews((prev) => prev.filter((n) => n.id !== id));
      },
      addApplication: (app) => {
        setApplications((prev) => [
          {
            ...app,
            id: uid("app"),
            status: "new",
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ]);
      },
      updateApplication: (id, data) => {
        setApplications((prev) =>
          prev.map((a) => (a.id === id ? { ...a, ...data } : a))
        );
      },
      deleteApplication: (id) => {
        setApplications((prev) => prev.filter((a) => a.id !== id));
      },
      updateSettings: (data) => {
        setSettings((prev) => ({ ...prev, ...data }));
      },
      getArtist: (id) => artists.find((a) => a.id === id),
      getRelease: (id) => releases.find((r) => r.id === id),
      getNews: (id) => news.find((n) => n.id === id),
    }),
    [artists, releases, news, applications, settings, isAuthenticated]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
