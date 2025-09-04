import { useState, useEffect } from "react";
import { MediaItem, FilterOptions, generateMockMediaItems } from "../../types/media";
import { MediaGrid } from "./MediaGrid";

export function MediaBrowser() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [searchQuery, setSearchQuery] = useState("");

  // Simulated data fetch
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setItems(generateMockMediaItems(20));
      setLoading(false);
    };

    loadData();
  }, []);

  // Simulated load more
  const handleLoadMore = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setItems((prev) => [...prev, ...generateMockMediaItems(8)]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Media Gallery
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Browse and download high-quality photos and videos
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="flex">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search media..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Filter Options */}
          <div className="flex flex-wrap gap-4">
            <select
              onChange={(e) =>
                setFilters((f) => ({ ...f, type: e.target.value as any }))
              }
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="">All Types</option>
              <option value="photo">Photos</option>
              <option value="video">Videos</option>
            </select>

            <select
              onChange={(e) =>
                setFilters((f) => ({ ...f, license: e.target.value as any }))
              }
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="">All Licenses</option>
              <option value="CC0">CC0</option>
              <option value="CC BY">CC BY</option>
              <option value="CC BY-SA">CC BY-SA</option>
              <option value="CC BY-NC">CC BY-NC</option>
              <option value="CC BY-ND">CC BY-ND</option>
            </select>

            <select
              onChange={(e) =>
                setFilters((f) => ({ ...f, orientation: e.target.value as any }))
              }
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="">All Orientations</option>
              <option value="landscape">Landscape</option>
              <option value="portrait">Portrait</option>
              <option value="square">Square</option>
            </select>

            <select
              onChange={(e) =>
                setFilters((f) => ({ ...f, resolution: e.target.value as any }))
              }
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="">All Resolutions</option>
              <option value="4K">4K</option>
              <option value="2K">2K</option>
              <option value="HD">HD</option>
              <option value="SD">SD</option>
            </select>
          </div>
        </div>

        {/* Media Grid */}
        <MediaGrid
          items={items}
          loading={loading}
          onLoadMore={handleLoadMore}
        />
      </div>
    </div>
  );
}
