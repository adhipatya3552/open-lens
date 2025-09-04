import { Link, useLocation } from "react-router-dom";
import { User } from "../../types/dashboard";

interface SidebarProps {
  user: User;
  isExpanded: boolean;
  onToggle: () => void;
}

export function Sidebar({ user, isExpanded, onToggle }: SidebarProps) {
  const location = useLocation();

  const navigation = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      ),
    },
    {
      name: "Media",
      path: "/dashboard/media",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      ),
    },
    {
      name: "Collections",
      path: "/dashboard/collections",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      ),
    },
    {
      name: "Analytics",
      path: "/dashboard/analytics",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      ),
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
      ),
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed right-4 top-4 z-50 rounded-lg bg-gray-900/10 p-2 text-gray-600 backdrop-blur-lg dark:bg-white/10 dark:text-gray-200 lg:hidden"
        onClick={onToggle}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isExpanded ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          )}
        </svg>
      </button>

      {/* Backdrop */}
      {!isExpanded && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 transform bg-white/80 backdrop-blur-xl transition-all duration-300 dark:bg-gray-900/80 lg:translate-x-0 ${
          isExpanded ? "w-64" : "w-20 -translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Toggle button for desktop */}
          <button
            onClick={onToggle}
            className="absolute -right-3 top-10 hidden rounded-full border border-gray-200 bg-white p-1.5 text-gray-400 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-100 lg:block"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isExpanded ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              )}
            </svg>
          </button>

          {/* User Profile */}
          <div className="border-b border-gray-200 p-6 dark:border-gray-800">
            <div className="mb-4 flex items-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-12 w-12 rounded-full"
              />
              {isExpanded && (
                <div className="ml-3">
                  <h2 className="font-semibold text-gray-900 dark:text-white">
                    {user.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    @{user.username}
                  </p>
                </div>
              )}
            </div>
            {/* Quick Stats */}
            {isExpanded && (
              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {user.stats.followers}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">Followers</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {user.stats.uploads}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">Uploads</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200"
                      : "text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800/50"
                  } ${!isExpanded && "justify-center"}`}
                  title={!isExpanded ? item.name : undefined}
                >
                  <svg
                    className={`h-5 w-5 ${isExpanded ? "mr-3" : "mx-auto"} ${
                      isActive
                        ? "text-blue-700 dark:text-blue-200"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {item.icon}
                  </svg>
                  {isExpanded && item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Status */}
          {isExpanded && (
            <div className="border-t border-gray-200 px-4 py-4 dark:border-gray-800">
              <div className="flex items-center space-x-2">
                <span className="flex h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Online
                </span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
