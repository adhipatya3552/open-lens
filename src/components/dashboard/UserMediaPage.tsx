import { useState, useEffect } from "react";
import { MediaItem, generateMockMediaItems } from "../../types/media";
import { MediaGrid } from "../media/MediaGrid";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";

export function UserMediaPage() {
  const { user } = useUser();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "downloads">("recent");

  useEffect(() => {
    const loadUserMedia = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Generate mock user media
      const userMedia = generateMockMediaItems(12).map(item => ({
        ...item,
        creator: {
          ...item.creator,
          id: user?.id || "current-user",
          name: user?.fullName || user?.firstName || "You",
          avatar: user?.imageUrl || item.creator.avatar,
        }
      }));
      
      setItems(userMedia);
      setLoading(false);
    };

    loadUserMedia();
  }, [user]);

  const handleSelectionChange = (id: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleBulkAction = (action: "delete" | "collection" | "download") => {
    console.log(`Bulk ${action} for items:`, Array.from(selectedItems));
    // Implement bulk actions
    setSelectedItems(new Set());
  };

  const sortedItems = [...items].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.views - a.views;
      case "downloads":
        return b.downloads - a.downloads;
      case "recent":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const stats = {
    total: items.length,
    totalViews: items.reduce((sum, item) => sum + item.views, 0),
    totalDownloads: items.reduce((sum, item) => sum + item.downloads, 0),
    avgViews: items.length > 0 ? Math.round(items.reduce((sum, item) => sum + item.views, 0) / items.length) : 0,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white md:text-3xl">
            Your Media
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Manage and track your uploaded content
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="downloads">Most Downloaded</option>
          </select>
          
          <div className="flex rounded-lg border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 text-sm font-medium ${
                viewMode === "grid"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
              } rounded-l-lg`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 text-sm font-medium ${
                viewMode === "list"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
              } rounded-r-lg`}
            >
              List
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="flex items-center">
            <div className="rounded-lg bg-blue-500/10 p-3">
              <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Media</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="flex items-center">
            <div className="rounded-lg bg-green-500/10 p-3">
              <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Views</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalViews.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="flex items-center">
            <div className="rounded-lg bg-purple-500/10 p-3">
              <svg className="h-6 w-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Downloads</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalDownloads.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="flex items-center">
            <div className="rounded-lg bg-orange-500/10 p-3">
              <svg className="h-6 w-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Views</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.avgViews}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bulk Actions */}
      {selectedItems.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20"
        >
          <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
            {selectedItems.size} item{selectedItems.size !== 1 ? 's' : ''} selected
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleBulkAction("collection")}
              className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-medium text-white hover:bg-blue-600"
            >
              Add to Collection
            </button>
            <button
              onClick={() => handleBulkAction("download")}
              className="rounded-lg bg-green-500 px-3 py-1 text-sm font-medium text-white hover:bg-green-600"
            >
              Download
            </button>
            <button
              onClick={() => handleBulkAction("delete")}
              className="rounded-lg bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </motion.div>
      )}

      {/* Media Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <MediaGrid
          items={sortedItems}
          loading={loading}
          selectable
          selectedItems={selectedItems}
          onSelectionChange={handleSelectionChange}
        />
      </motion.div>
    </div>
  );
}