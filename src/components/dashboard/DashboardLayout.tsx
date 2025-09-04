import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { User } from "../../types/dashboard";

// Mock user data - replace with actual user data from your auth system
const mockUser: User = {
  id: "1",
  name: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  avatar: "https://ui-avatars.com/api/?name=John+Doe",
  bio: "Digital content creator",
  isVerified: true,
  isCreator: true,
  joinedDate: new Date().toISOString(),
  stats: {
    uploads: 42,
    downloads: 1337,
    followers: 256,
    views: 5000,
    following: 120,
    earnings: 250.75,
  },
  badges: [
    { id: "1", name: "Pro Creator", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200", icon: "💎" },
    { id: "2", name: "Early Adopter", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", icon: "🚀" },
  ],
  socialLinks: {
    website: "https://johndoe.com",
    twitter: "johndoe",
    instagram: "johndoe.creates",
  }
};

export function DashboardLayout() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar 
        user={mockUser} 
        isExpanded={isSidebarExpanded}
        onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
      />

      {/* Main Content */}
      <div className={`flex-1 overflow-auto transition-all duration-300 ${isSidebarExpanded ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

