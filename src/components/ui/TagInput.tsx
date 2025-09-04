import { useState, useRef, KeyboardEvent } from "react";

// Predefined tags with categories and icons
const predefinedTags = {
  nature: ['landscape', 'wildlife', 'forest', 'mountain', 'ocean', 'sunset', 'flowers'],
  urban: ['city', 'street', 'architecture', 'building', 'skyline', 'night'],
  people: ['portrait', 'lifestyle', 'fashion', 'crowd', 'culture', 'event'],
  technology: ['gadget', 'computer', 'digital', 'innovation', 'software', 'hardware'],
  art: ['abstract', 'painting', 'sculpture', 'design', 'creative', 'artistic'],
  other: ['food', 'travel', 'sports', 'business', 'education', 'health']
};

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  label?: string;
  error?: string;
}

export function TagInput({
  tags,
  onChange,
  suggestions = [],
  label,
  error,
}: TagInputProps) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  // State for managing input and suggestions
  const inputRef = useRef<HTMLInputElement>(null);

  // Combine custom suggestions with predefined tags
  const allSuggestions = [
    ...suggestions,
    ...Object.values(predefinedTags).flat()
  ];

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        onChange([...tags, input.trim()]);
      }
      setInput("");
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      onChange([...tags, tag]);
    }
    setInput("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Combine all available tags for filtering
  const filteredSuggestions = [
    ...suggestions,
    ...Object.values(predefinedTags).flat()
  ].filter(
    (suggestion, index, self) =>
      // Remove duplicates
      self.indexOf(suggestion) === index &&
      // Filter by input
      suggestion.toLowerCase().includes(input.toLowerCase()) &&
      // Remove already selected tags
      !tags.includes(suggestion)
  );

  return (
    <div className="relative">
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div
        className={`group flex flex-wrap gap-2 rounded-lg border bg-white p-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="rounded-full p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800"
            >
              <svg
                className="h-3 w-3"
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
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          className="flex-1 border-none bg-transparent p-1 focus:outline-none dark:text-white"
          placeholder={tags.length === 0 ? "Add tags..." : ""}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
      {/* Popular Tags and Categories - Always visible */}
      <div className="mt-2 rounded-lg border border-gray-300 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Popular Tags</h4>
          <div className="flex flex-wrap gap-2">
            {Object.values(predefinedTags)
              .flat()
              .slice(0, 8)
              .map((tag) => (
                <button
                  key={tag}
                  onClick={() => !tags.includes(tag) && addTag(tag)}
                  disabled={tags.includes(tag)}
                  className={`rounded-full px-3 py-1 text-sm transition-colors ${
                    tags.includes(tag)
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200"
                      : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
          </div>
        </div>

        {/* Search Results - Only visible when searching */}
        {showSuggestions && input && filteredSuggestions.length > 0 && (
          <div className="border-b border-gray-200 p-3 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Results
            </h4>
            <div className="space-y-1">
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => addTag(suggestion)}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-sm text-gray-900 hover:bg-blue-50 dark:text-white dark:hover:bg-blue-900/30"
                >
                  <span className="text-blue-500 dark:text-blue-400">🏷️</span>
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
      
    </div>
  );
}
