import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "../../hooks/useDebounce";
import { MediaItem, FilterOptions } from "../../types/media";
import { MediaGrid } from "../media/MediaGrid";
import { SearchFilters } from "./SearchFilters";
import { SearchSuggestions } from "./SearchSuggestions";

interface SearchState extends FilterOptions {
  query: string;
  page: number;
  sortBy: "relevant" | "recent" | "popular";
  colors: string[];
  creators: string[];
  dateRange: {
    start: string | null;
    end: string | null;
  };
}

export function SearchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [searchState, setSearchState] = useState<SearchState>({
    query: "",
    page: 1,
    sortBy: "relevant",
    type: undefined,
    license: undefined,
    orientation: undefined,
    resolution: undefined,
    colors: [],
    creators: [],
    dateRange: {
      start: null,
      end: null,
    },
  });
  const [results, setResults] = useState<MediaItem[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  const debouncedQuery = useDebounce(searchState.query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      performSearch();
    }
  }, [debouncedQuery, searchState.page, searchState.sortBy]);

  const performSearch = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setResults([]); // Replace with actual API call
    setTotalResults(0);
    setIsLoading(false);
  };

  const handleSearch = (query: string) => {
    setSearchState((prev) => ({ ...prev, query, page: 1 }));
  };

  const removeFilter = (key: keyof SearchState, value?: string) => {
    setSearchState((prev) => {
      if (Array.isArray(prev[key]) && value) {
        return {
          ...prev,
          [key]: (prev[key] as string[]).filter((v) => v !== value),
        };
      }
      return {
        ...prev,
        [key]: undefined,
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Search Header */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchState.query}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              placeholder="Search for photos, videos, and more..."
            />
            {searchState.query && showSuggestions && (
              <SearchSuggestions
                query={searchState.query}
                onSelect={(suggestion) => {
                  handleSearch(suggestion);
                  setShowSuggestions(false);
                }}
                onClose={() => setShowSuggestions(false)}
              />
            )}
          </div>

          {/* Active Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            {Object.entries(searchState).map(([key, value]) => {
              if (!value || key === "query" || key === "page") return null;
              if (Array.isArray(value)) {
                return value.map((v) => (
                  <motion.button
                    key={`${key}-${v}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => removeFilter(key as keyof SearchState, v)}
                    className="flex items-center space-x-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    <span>{v}</span>
                    <XIcon className="h-4 w-4" />
                  </motion.button>
                ));
              }
              return (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => removeFilter(key as keyof SearchState)}
                  className="flex items-center space-x-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  <span>{`${key}: ${value}`}</span>
                  <XIcon className="h-4 w-4" />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div
            className={`w-72 flex-shrink-0 transition-all duration-300 ease-in-out lg:relative lg:block ${
              showFilters ? "relative block" : "hidden"
            }`}
          >
            <SearchFilters
              filters={searchState}
              onChange={(key, value) =>
                setSearchState((prev) => ({ ...prev, [key]: value }))
              }
            />
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="mr-4 rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
                >
                  <FilterIcon className="h-5 w-5" />
                </button>
                <span className="text-gray-600 dark:text-gray-400">
                  {totalResults.toLocaleString()} results
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={searchState.sortBy}
                  onChange={(e) =>
                    setSearchState((prev) => ({
                      ...prev,
                      sortBy: e.target.value as SearchState["sortBy"],
                    }))
                  }
                  className="rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="relevant">Most Relevant</option>
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                </select>

                {selectedItems.size > 0 && (
                  <div className="flex items-center space-x-2">
                    <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
                      Add to Collection
                    </button>
                    <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                      Download
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Results Grid */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-[4/3] animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"
                    />
                  ))}
                </motion.div>
              ) : results.length > 0 ? (
                <MediaGrid
                  items={results}
                  selectable
                  selectedItems={selectedItems}
                  onSelectionChange={handleSelectionChange}
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-12 dark:border-gray-700"
                >
                  <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                    <SearchIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  </div>
                  <h3 className="mt-4 text-sm font-medium text-gray-900 dark:text-white">
                    No results found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Try adjusting your search or filters
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Load More */}
            {results.length > 0 && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() =>
                    setSearchState((prev) => ({ ...prev, page: prev.page + 1 }))
                  }
                  className="rounded-lg bg-gray-100 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function FilterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  );
}
