import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  UploadFile,
  FileMetadata,
  SUPPORTED_FORMATS,
  CATEGORIES,
} from "../../types/upload";
import { FileUploadCard } from "./FileUploadCard";
import { Button } from "../ui/Button";

export function MediaUpload() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const createFileObject = (file: File): UploadFile => ({
    id: Math.random().toString(36).slice(2),
    file,
    preview: URL.createObjectURL(file),
    progress: 0,
    status: "pending",
    metadata: {
      title: file.name.split(".")[0],
      description: "",
      tags: [],
      license: "CC BY",
      category: "nature",
    },
  });

  const handleFiles = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter((file) =>
      [...SUPPORTED_FORMATS.image, ...SUPPORTED_FORMATS.video].includes(file.type)
    );

    if (validFiles.length !== acceptedFiles.length) {
      toast.error("Some files were rejected. Only images and videos are allowed.");
    }

    const newFiles = validFiles.map(createFileObject);
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFiles = Array.from(e.dataTransfer.files);
      handleFiles(droppedFiles);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const updateFileMetadata = useCallback(
    (id: string, metadata: Partial<FileMetadata>) => {
      setFiles((prev) =>
        prev.map((file) =>
          file.id === id
            ? { ...file, metadata: { ...file.metadata, ...metadata } }
            : file
        )
      );
    },
    []
  );

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  }, []);

  const handleSubmit = async () => {
    // Simulate file upload
    for (const file of files) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id ? { ...f, status: "uploading" } : f
        )
      );

      // Simulate progress updates
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, progress } : f
          )
        );
      }

      // Simulate success/error
      const success = Math.random() > 0.1;
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id
            ? {
                ...f,
                status: success ? "success" : "error",
                error: success ? undefined : "Upload failed",
              }
            : f
        )
      );

      if (success) {
        toast.success(`${file.metadata.title} uploaded successfully!`);
      } else {
        toast.error(`Failed to upload ${file.metadata.title}`);
      }
    }

    // Navigate to browse page after all uploads
    navigate("/browse");
  };

  const isValid = useMemo(
    () =>
      files.length > 0 &&
      files.every(
        (file) =>
          file.metadata.title.trim() &&
          file.metadata.tags.length > 0
      ),
    [files]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-8 dark:from-gray-900 dark:to-gray-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Upload Media
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Share your photos and videos with the community
          </p>
        </div>

        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`mb-8 flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
            isDragging
              ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950"
              : "border-gray-300 bg-white hover:border-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
          }`}
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.multiple = true;
            input.accept = [...SUPPORTED_FORMATS.image, ...SUPPORTED_FORMATS.video].join(",");
            input.onchange = (e) => {
              const files = Array.from((e.target as HTMLInputElement).files || []);
              handleFiles(files);
            };
            input.click();
          }}
        >
          <svg
            className={`mb-4 h-12 w-12 ${
              isDragging ? "text-blue-500" : "text-gray-400"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            {isDragging ? "Drop files here" : "Drag files here or click to browse"}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Supports images and videos up to 50MB
          </p>
        </div>

        {/* File Cards */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          {files.map((file) => (
            <FileUploadCard
              key={file.id}
              file={file}
              onUpdate={updateFileMetadata}
              onRemove={removeFile}
            />
          ))}
        </div>

        {/* Submit Button */}
        {files.length > 0 && (
          <div className="sticky bottom-4 flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={!isValid}
              size="lg"
            >
              Upload {files.length} {files.length === 1 ? "file" : "files"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
