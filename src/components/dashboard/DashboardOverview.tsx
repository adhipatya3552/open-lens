import { ProfileHeader } from "./ProfileHeader";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export function DashboardOverview() {
  const { user } = useUser();
  const navigate = useNavigate();
  
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
    badges: user.publicMetadata?.badges as any[] || [
      { 
        id: "1",
        name: "Community Member", 
        color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        icon: "🌟"
      },
    ],
    socialLinks: user.publicMetadata?.socialLinks as any || {},
  };

  const handleUpdateAvatar = async (file: File) => {
    // Implement avatar update logic
    console.log("Updating avatar:", file);
  };

  const handleUpdateBio = async (bio: string) => {
    // Implement bio update logic
    console.log("Updating bio:", bio);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <ProfileHeader
        user={transformedUser}
        onUpdateAvatar={handleUpdateAvatar}
        onUpdateBio={handleUpdateBio}
      />

      {/* Quick Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="flex items-center">
            <div className="rounded-lg bg-blue-500/10 p-3">
              <svg
                className="h-8 w-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Media
              </h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                {transformedUser.stats.uploads}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="flex items-center">
            <div className="rounded-lg bg-green-500/10 p-3">
              <svg
                className="h-8 w-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Downloads
              </h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                {transformedUser.stats.downloads}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="flex items-center">
            <div className="rounded-lg bg-purple-500/10 p-3">
              <svg
                className="h-8 w-8 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Followers
              </h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                {transformedUser.stats.followers}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="flex items-center">
            <div className="rounded-lg bg-orange-500/10 p-3">
              <svg
                className="h-8 w-8 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Views
              </h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                {transformedUser.stats.views}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 sm:grid-cols-3">
        <button 
          onClick={() => navigate('/dashboard/upload')}
          className="flex items-center justify-center rounded-xl bg-blue-500 p-6 text-white shadow-sm transition-transform hover:scale-105">
          <svg
            className="mr-3 h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Upload New Media
        </button>

        <button 
          onClick={() => navigate('/dashboard/collections')}
          className="flex items-center justify-center rounded-xl bg-purple-500 p-6 text-white shadow-sm transition-transform hover:scale-105">
          <svg
            className="mr-3 h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          View Collections
        </button>

        <button 
          onClick={() => navigate('/dashboard/analytics')}
          className="flex items-center justify-center rounded-xl bg-green-500 p-6 text-white shadow-sm transition-transform hover:scale-105">
          <svg
            className="mr-3 h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          View Analytics
        </button>
      </div>
    </div>
  );
}
