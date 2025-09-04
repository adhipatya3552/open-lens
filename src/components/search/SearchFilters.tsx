import { useState } from "react";
import { ChromePicker } from "react-color";
import { License, MediaType, Orientation, Resolution } from "../../types/media";
import { Button } from "../ui/Button";

interface SearchFiltersProps {
  filters: {
    type?: MediaType;
    license?: License;
    orientation?: Orientation;
    resolution?: Resolution;
    colors: string[];
    creators: string[];
    dateRange: {
      start: string | null;
      end: string | null;
    };
  };
  onChange: (key: string, value: any) => void;
}

export function SearchFilters({ filters, onChange }: SearchFiltersProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const mediaTypes: { value: MediaType; label: string }[] = [
    { value: "photo", label: "Photos" },
    { value: "video", label: "Videos" },
  ];

  const licenses: { value: License; label: string }[] = [
    { value: "CC0", label: "CC0 (Public Domain)" },
    { value: "CC BY", label: "CC BY" },
    { value: "CC BY-SA", label: "CC BY-SA" },
    { value: "CC BY-NC", label: "CC BY-NC" },
    { value: "CC BY-ND", label: "CC BY-ND" },
  ];

  const orientations: { value: Orientation; label: string }[] = [
    { value: "landscape", label: "Landscape" },
    { value: "portrait", label: "Portrait" },
    { value: "square", label: "Square" },
  ];

  const resolutions: { value: Resolution; label: string }[] = [
    { value: "4K", label: "4K" },
    { value: "2K", label: "2K" },
    { value: "HD", label: "HD" },
    { value: "SD", label: "SD" },
  ];

  return (
    <div className="space-y-6 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
      {/* Media Type */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
          Media Type
        </h3>
        <div className="flex flex-wrap gap-2">
          {mediaTypes.map((type) => (
            <button
              key={type.value}
              onClick={() =>
                onChange("type", filters.type === type.value ? undefined : type.value)
              }
              className={`rounded-lg px-3 py-1 text-sm font-medium ${
                filters.type === type.value
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* License */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
          License
        </h3>
        <div className="space-y-2">
          {licenses.map((license) => (
            <button
              key={license.value}
              onClick={() =>
                onChange(
                  "license",
                  filters.license === license.value ? undefined : license.value
                )
              }
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-medium ${
                filters.license === license.value
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {license.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orientation */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
          Orientation
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {orientations.map((orientation) => (
            <button
              key={orientation.value}
              onClick={() =>
                onChange(
                  "orientation",
                  filters.orientation === orientation.value
                    ? undefined
                    : orientation.value
                )
              }
              className={`flex flex-col items-center rounded-lg p-2 ${
                filters.orientation === orientation.value
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              <OrientationIcon type={orientation.value} className="h-6 w-6" />
              <span className="mt-1 text-xs">{orientation.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Resolution */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
          Resolution
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {resolutions.map((resolution) => (
            <button
              key={resolution.value}
              onClick={() =>
                onChange(
                  "resolution",
                  filters.resolution === resolution.value
                    ? undefined
                    : resolution.value
                )
              }
              className={`rounded-lg px-3 py-1 text-sm font-medium ${
                filters.resolution === resolution.value
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {resolution.label}
            </button>
          ))}
        </div>
      </div>

      {/* Color Picker */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
          Colors
        </h3>
        <div className="flex flex-wrap gap-2">
          {filters.colors.map((color) => (
            <button
              key={color}
              onClick={() =>
                onChange(
                  "colors",
                  filters.colors.filter((c) => c !== color)
                )
              }
              className="relative flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ backgroundColor: color }}
            >
              <XIcon className="h-4 w-4 text-white mix-blend-difference" />
            </button>
          ))}
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-400 hover:border-gray-400 hover:text-gray-500 dark:border-gray-700 dark:text-gray-500 dark:hover:border-gray-600 dark:hover:text-gray-400"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
        {showColorPicker && (
          <div className="relative mt-2">
            <div className="absolute z-10">
              <ChromePicker
                color="#000000"
                onChange={(color) => {
                  onChange("colors", [...filters.colors, color.hex]);
                  setShowColorPicker(false);
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Date Range */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
          Date Range
        </h3>
        <div className="space-y-2">
          <input
            type="date"
            value={filters.dateRange.start || ""}
            onChange={(e) =>
              onChange("dateRange", {
                ...filters.dateRange,
                start: e.target.value,
              })
            }
            className="block w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="date"
            value={filters.dateRange.end || ""}
            onChange={(e) =>
              onChange("dateRange", {
                ...filters.dateRange,
                end: e.target.value,
              })
            }
            className="block w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Reset Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          onChange("type", undefined);
          onChange("license", undefined);
          onChange("orientation", undefined);
          onChange("resolution", undefined);
          onChange("colors", []);
          onChange("creators", []);
          onChange("dateRange", { start: null, end: null });
        }}
      >
        Reset Filters
      </Button>
    </div>
  );
}

function OrientationIcon({
  type,
  className,
}: {
  type: Orientation;
  className?: string;
}) {
  switch (type) {
    case "landscape":
      return (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <rect width="18" height="12" x="3" y="6" rx="2" strokeWidth={2} />
        </svg>
      );
    case "portrait":
      return (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <rect width="12" height="18" x="6" y="3" rx="2" strokeWidth={2} />
        </svg>
      );
    case "square":
      return (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <rect width="14" height="14" x="5" y="5" rx="2" strokeWidth={2} />
        </svg>
      );
  }
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

function PlusIcon({ className }: { className?: string }) {
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
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  );
}
