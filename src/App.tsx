import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { LoginPage } from "./components/auth/LoginPage";
import { RegisterPage } from "./components/auth/RegisterPage";
import { MediaBrowser } from "./components/media/MediaBrowser";
import { MediaUpload } from "./components/media/MediaUpload";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { DashboardOverview } from "./components/dashboard/DashboardOverview";
import { Analytics } from "./components/dashboard/Analytics";
import { Navbar } from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import CreatorBenefits from "./components/CreatorBenefits";
import Footer from "./components/Footer";

// Mock analytics data
const mockAnalytics = {
  dailyViews: Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    views: Math.floor(Math.random() * 1000),
  })),
  dailyDownloads: Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    downloads: Math.floor(Math.random() * 100),
  })),
  dailyEarnings: Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    amount: Math.floor(Math.random() * 500),
  })),
  popularContent: [],
  topCountries: [
    { country: "United States", views: 2500, downloads: 150 },
    { country: "Germany", views: 1800, downloads: 120 },
    { country: "Japan", views: 1200, downloads: 80 },
  ],
};

const Landing = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <section id="features">
          <Features />
        </section>
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <section id="benefits">
          <CreatorBenefits />
        </section>
        <Footer />
      </main>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans antialiased dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/browse" element={<MediaBrowser />} />
          <Route path="/upload" element={<MediaUpload />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="analytics" element={<Analytics data={mockAnalytics} />} />
            <Route path="media" element={<MediaBrowser />} />
            <Route path="upload" element={<MediaUpload />} />
          </Route>
        </Routes>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          className: "dark:bg-gray-800 dark:text-white",
        }}
      />
    </Router>
  );
};

export default App;