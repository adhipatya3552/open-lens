import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Sidebar } from "./Sidebar";

export function DashboardLayout() {
  const { user } = useUser();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  if (!user) {
    return <div>Loading...</div>;
  }

  // Transform Clerk user to our User type
  const transformedUser = {
    id: user.id,
    name: user.fullName || user.firstName || "User",
    username: user.username || user.emailAddresses[0]?.emailAddress.split('@')[0] || "user",
    email: user.emailAddresses[0]?.emailAddress || "",
    avatar: user.imageUrl,
    bio: user.publicMetadata?.bio as string || "OpenLens community member",
    isVerified: user.publicMetadata?.isVerified as boolean || false,
    isCreator: user.publicMetadata?.isCreator as boolean || true,
    joinedDate: user.createdAt?.toISOString() || new Date().toISOString(),
    stats: {
      uploads: user.publicMetadata?.uploads as number || 0,
      downloads: user.publicMetadata?.downloads as number || 0,
      followers: user.publicMetadata?.followers as number || 0,
      views: user.publicMetadata?.views as number || 0,
      following: user.publicMetadata?.following as number || 0,
    },
    badges: user.publicMetadata?.badges as any[] || [],
    socialLinks: user.publicMetadata?.socialLinks as any || {},
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar 
        user={transformedUser} 
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

