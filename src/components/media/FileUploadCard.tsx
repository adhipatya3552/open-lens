import { useState, useEffect } from "react";
import { UploadFile, LICENSE_INFO } from "../../types/upload";
import { TagInput } from "../ui/TagInput";
import { Input } from "../ui/Input";
import { Category, defaultCategories } from "../../types/categories";
import { toast } from "react-hot-toast";

interface FileUploadCardProps {
  file: UploadFile;
  onUpdate: (id: string, metadata: Partial<UploadFile["metadata"]>) => void;
  onRemove: (id: string) => void;
}

export function FileUploadCard({
  file,
  onUpdate,
  onRemove,
}: FileUploadCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Preview */}
      <div className="relative aspect-video bg-gray-100 dark:bg-gray-900">
        {file.file.type.startsWith("video/") ? (
          <video
            src={file.preview}
            className="h-full w-full object-cover"
            controls
            muted
          />
        ) : (
          <img
            src={file.preview}
            alt={file.metadata.title || file.file.name}
            className="h-full w-full object-cover"
          />
        )}

        {/* Progress Overlay */}
        {file.status === "uploading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-2/3 space-y-2">
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${file.progress}%` }}
                />
              </div>
              <p className="text-center text-sm text-white">
                Uploading... {file.progress}%
              </p>
            </div>
          </div>
        )}

        {/* Success/Error Overlay */}
        {(file.status === "success" || file.status === "error") && (
          <div
            className={`absolute inset-0 flex items-center justify-center ${
              file.status === "success"
                ? "bg-green-500/50"
                : "bg-red-500/50"
            } backdrop-blur-sm`}
          >
            {file.status === "success" ? (
              <svg
                className="h-16 w-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <div className="text-center text-white">
                <svg
                  className="mx-auto h-16 w-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="mt-2">{file.error}</p>
              </div>
            )}
          </div>
        )}

        {/* Remove Button */}
        <button
          onClick={() => onRemove(file.id)}
          className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white backdrop-blur-sm transition-transform hover:scale-110"
        >
          <svg
            className="h-5 w-5"
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
      </div>

      {/* Metadata Form */}
      <div className="space-y-4 p-4">
        <Input
          label="Title"
          value={file.metadata.title}
          onChange={(e) => onUpdate(file.id, { title: e.target.value })}
          placeholder="Enter a title..."
        />

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            value={file.metadata.description}
            onChange={(e) =>
              onUpdate(file.id, { description: e.target.value })
            }
            rows={3}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder="Add a description..."
          />
        </div>

        {/* Category Selection */}
        <div className="space-y-4">
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <div className="grid grid-cols-1 gap-4">
            <select
              value={file.metadata.category}
              onChange={(e) => {
                const newCategory = e.target.value;
                onUpdate(file.id, { 
                  category: newCategory,
                  subcategory: "" // Reset subcategory when category changes
                });
              }}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select Category</option>
              {defaultCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {file.metadata.category === 'other' ? (
              <div>
                <Input
                  label="Custom Category"
                  value={file.metadata.customCategory || ''}
                  onChange={(e) => {
                    const customCategory = e.target.value;
                    // Check if category already exists
                    const exists = defaultCategories.some(
                      cat => cat.name.toLowerCase() === customCategory.toLowerCase()
                    );
                    
                    if (exists) {
                      toast.error(`Category "${customCategory}" already exists!`);
                      return;
                    }
                    
                    onUpdate(file.id, { 
                      customCategory,
                      subcategory: "" 
                    });
                  }}
                  placeholder="Enter a new category name..."
                />
              </div>
            ) : file.metadata.category ? (
              <select
                value={file.metadata.subcategory || ""}
                onChange={(e) => onUpdate(file.id, { subcategory: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select Subcategory</option>
                {defaultCategories
                  .find(cat => cat.id === file.metadata.category)
                  ?.subcategories.map(sub => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))
                }
              </select>
            ) : null}
          </div>
        </div>

        {/* License Selection */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            License
          </label>
          <select
            value={file.metadata.license}
            onChange={(e) =>
              onUpdate(file.id, { license: e.target.value as any })
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            {Object.entries(LICENSE_INFO).map(([license, info]) => (
              <option key={license} value={license} title={info.description}>
                {license}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {LICENSE_INFO[file.metadata.license].description}
          </p>
        </div>

        <TagInput
          label="Tags"
          tags={file.metadata.tags}
          onChange={(tags) => onUpdate(file.id, { tags })}
          suggestions={[
            "nature",
            "urban",
            "technology",
            "people",
            "abstract",
            "landscape",
            "portrait",
            "wildlife",
          ]}
        />
      </div>
    </div>
  );
}
