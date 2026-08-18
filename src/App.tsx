import { HashRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { ArtistsPage } from "./pages/ArtistsPage";
import { ArtistDetailPage } from "./pages/ArtistDetailPage";
import { DistributionPage } from "./pages/DistributionPage";
import { AboutPage } from "./pages/AboutPage";
import { NewsPage } from "./pages/NewsPage";
import { NewsDetailPage } from "./pages/NewsDetailPage";
import { FaqPage } from "./pages/FaqPage";
import { ApplyPage } from "./pages/ApplyPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminArtists } from "./pages/admin/AdminArtists";
import { AdminPartners } from "./pages/admin/AdminPartners";
import { AdminNews } from "./pages/admin/AdminNews";
import { AdminApplications } from "./pages/admin/AdminApplications";
import { AdminSettings } from "./pages/admin/AdminSettings";

export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <Routes>
          {/* Hidden admin — no public links anywhere on the site */}
          <Route path="/nv-console/gate" element={<AdminLogin />} />
          <Route path="/nv-console" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="artists" element={<AdminArtists />} />
            <Route path="partners" element={<AdminPartners />} />
            <Route path="news" element={<AdminNews />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="artists" element={<ArtistsPage />} />
            <Route path="artists/:id" element={<ArtistDetailPage />} />
            <Route path="distribution" element={<DistributionPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="news/:id" element={<NewsDetailPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="apply" element={<ApplyPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </StoreProvider>
  );
}
