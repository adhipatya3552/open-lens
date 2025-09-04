import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchSuggestionsProps {
  query: string;
  onSelect: (suggestion: string) => void;
  onClose: () => void;
}

export function SearchSuggestions({
  query,
  onSelect,
  onClose,
}: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (query) {
      // Mock suggestions - replace with real API call
      const mockSuggestions = [
        `${query} photos`,
        `${query} 4K`,
        `${query} backgrounds`,
        `${query} stock footage`,
      ];
      setSuggestions(mockSuggestions);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".search-suggestions")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="search-suggestions absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800"
      >
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => onSelect(suggestion)}
              className="flex w-full items-center space-x-3 px-4 py-3 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <SearchIcon className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">
                {suggestion}
              </span>
            </button>
          ))}
        </div>

        {/* Trending Searches */}
        <div className="border-t border-gray-100 px-4 py-3 dark:border-gray-700">
          <h3 className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
            Trending Searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {["Nature", "Abstract", "Business", "Technology"].map((trend) => (
              <button
                key={trend}
                onClick={() => onSelect(trend)}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                {trend}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
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
