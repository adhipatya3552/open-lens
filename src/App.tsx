import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import { ClerkSignInPage } from "./components/auth/ClerkSignInPage";
import { ClerkSignUpPage } from "./components/auth/ClerkSignUpPage";
import { MediaBrowser } from "./components/media/MediaBrowser";
import { MediaUpload } from "./components/media/MediaUpload";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { DashboardOverview } from "./components/dashboard/DashboardOverview";
import { Analytics } from "./components/dashboard/Analytics";
import { UserMediaPage } from "./components/dashboard/UserMediaPage";
import { SettingsPage } from "./components/dashboard/SettingsPage";
import { CollectionsPage } from "./components/collections/CollectionsPage";
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
  popularContent: [
    {
      item: {
        id: "1",
        type: "photo" as const,
        title: "Mountain Landscape",
        thumbnail: "https://picsum.photos/seed/1/400/300",
        creator: { id: "1", name: "John Doe", avatar: "https://i.pravatar.cc/150?u=1" },
        views: 2500,
        downloads: 150,
      } as any,
      views: 2500,
      downloads: 150,
      earnings: 45.50,
    },
    {
      item: {
        id: "2",
        type: "video" as const,
        title: "City Timelapse",
        thumbnail: "https://picsum.photos/seed/2/400/300",
        creator: { id: "1", name: "John Doe", avatar: "https://i.pravatar.cc/150?u=1" },
        views: 1800,
        downloads: 95,
      } as any,
      views: 1800,
      downloads: 95,
      earnings: 28.75,
    },
  ],
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
          <Route path="/login" element={<ClerkSignInPage />} />
          <Route path="/register" element={<ClerkSignUpPage />} />
          <Route path="/browse" element={<MediaBrowser />} />
          <Route path="/upload" element={
            <SignedIn>
              <MediaUpload />
            </SignedIn>
          } />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={
            <SignedIn>
              <DashboardLayout />
            </SignedIn>
          }>
            <Route index element={
              <SignedIn>
                <DashboardOverview />
              </SignedIn>
            } />
            <Route path="analytics" element={
              <SignedIn>
                <Analytics data={mockAnalytics} />
              </SignedIn>
            } />
            <Route path="media" element={
              <SignedIn>
                <UserMediaPage />
              </SignedIn>
            } />
            <Route path="collections" element={
              <SignedIn>
                <CollectionsPage />
              </SignedIn>
            } />
            <Route path="settings" element={
              <SignedIn>
                <SettingsPage />
              </SignedIn>
            } />
            <Route path="upload" element={
              <SignedIn>
                <MediaUpload />
              </SignedIn>
            } />
          </Route>
          
          {/* Redirect to sign-in for protected routes when signed out */}
          <Route path="/dashboard/*" element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          } />
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