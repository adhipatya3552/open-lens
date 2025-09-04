import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Badge } from "../../types/dashboard";

interface ProfileHeaderProps {
  user: any;
  onUpdateAvatar: (file: File) => void;
  onUpdateBio: (bio: string) => void;
}

export function ProfileHeader({
  user,
  onUpdateAvatar,
  onUpdateBio,
}: ProfileHeaderProps) {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState(user.bio);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpdateAvatar(file);
    }
  };

  const handleBioSave = () => {
    onUpdateBio(bio);
    setIsEditingBio(false);
  };

  const BadgeComponent = ({ badge }: { badge: Badge }) => (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.color}`}
    >
      <svg
        className="-ml-0.5 mr-1.5 h-2 w-2"
        fill="currentColor"
        viewBox="0 0 8 8"
      >
        <circle cx="4" cy="4" r="3" />
      </svg>
      {badge.name}
    </span>
  );

  return (
    <div className="mb-8 overflow-hidden rounded-xl bg-white/80 shadow-lg backdrop-blur-xl dark:bg-gray-900/80">
      {/* Cover Image */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600" />

      <div className="px-6 pb-6">
        {/* Avatar and Basic Info */}
        <div className="flex flex-wrap items-end space-x-5">
          <div className="-mt-12 flex">
            <div className="relative inline-block">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-24 w-24 rounded-xl border-4 border-white object-cover dark:border-gray-900"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-1.5 text-white hover:bg-blue-700"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <input
                  id="avatar-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
          </div>

          <div className="mt-4 flex-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </h1>
              {user.isVerified && (
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              @{user.username}
            </p>

            {/* Badges */}
            <div className="mt-2 flex flex-wrap gap-2">
              {user.badges.map((badge) => (
                <BadgeComponent key={badge.id} badge={badge} />
              ))}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6">
          {isEditingBio ? (
            <div className="space-y-2">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                rows={3}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsEditingBio(false)}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBioSave}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div
              className="group relative cursor-pointer rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              onClick={() => setIsEditingBio(true)}
            >
              <p className="text-gray-600 dark:text-gray-300">{user.bio}</p>
              <span className="absolute right-4 top-4 hidden text-sm text-blue-600 group-hover:block dark:text-blue-400">
                Edit
              </span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">Uploads</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {user.stats.uploads}
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">Downloads</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {user.stats.downloads}
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">Views</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {user.stats.views}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
