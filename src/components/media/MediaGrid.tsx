import { useRef, useState } from "react";
import { MediaItem } from "../../types/media";
import { MediaCard } from "./MediaCard";
import { PreviewModal } from "./PreviewModal";

interface MediaGridProps {
  items: MediaItem[];
  loading?: boolean;
  onLoadMore?: () => void;
  selectable?: boolean;
  selectedItems?: Set<string>;
  onSelectionChange?: (id: string) => void;
}

export function MediaGrid({
  items,
  loading = false,
  onLoadMore,
  selectable,
  selectedItems,
  onSelectionChange,
}: MediaGridProps) {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  const handlePreview = (item: MediaItem) => {
    setSelectedItem(item);
  };

  const handleFavorite = (id: string, favorited: boolean) => {
    // TODO: Implement favorite functionality
    console.log("Toggle favorite:", id, favorited);
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`skeleton-${i}`}
          className="animate-pulse space-y-4 rounded-xl bg-gray-100 dark:bg-gray-800"
        >
          <div className="aspect-[4/3] w-full rounded-t-xl bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="flex space-x-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="h-8 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      ))}
    </>
  );

  // Empty state
  if (!loading && items.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 text-center">
        <svg
          className="h-20 w-20 text-gray-400"
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
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          No media found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <MediaCard
            key={item.id}
            item={item}
            onPreview={handlePreview}
            onFavorite={handleFavorite}
            selectable={selectable}
            selected={selectedItems?.has(item.id)}
            onSelectionChange={onSelectionChange}
          />
        ))}
        {loading && <LoadingSkeleton />}
      </div>

      {/* Infinite scroll observer */}
      {onLoadMore && (
        <div ref={observerTarget} className="h-10 w-full" />
      )}

      {/* Preview Modal */}
      {selectedItem && (
        <PreviewModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}
