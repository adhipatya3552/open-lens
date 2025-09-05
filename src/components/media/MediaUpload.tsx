import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

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
      category: "",
    },
  });

  const handleFiles = useCallback((acceptedFiles: File[]) => {
    // File size validation (50MB limit)
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes
    const oversizedFiles = acceptedFiles.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      toast.error(`${oversizedFiles.length} file(s) exceed the 50MB limit and were rejected.`);
    }

    const validFiles = acceptedFiles.filter((file) =>
      [...SUPPORTED_FORMATS.image, ...SUPPORTED_FORMATS.video].includes(file.type) &&
      file.size <= maxSize
    );

    const rejectedCount = acceptedFiles.length - validFiles.length - oversizedFiles.length;
    if (rejectedCount > 0) {
      toast.error(`${rejectedCount} file(s) were rejected. Only images and videos are allowed.`);
    }

    const newFiles = validFiles.map(createFileObject);
    setFiles((prev) => [...prev, ...newFiles]);
    
    if (validFiles.length > 0) {
      toast.success(`${validFiles.length} file(s) added successfully!`);
    }
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
    // Only set dragging to false if we're leaving the drop zone entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
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
    toast.success("File removed successfully");
  }, []);

  const handleSubmit = async () => {
    setIsUploading(true);
    setUploadComplete(false);
    
    let successCount = 0;
    let errorCount = 0;

    for (const file of files) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id ? { ...f, status: "uploading" } : f
        )
      );

      // Simulate progress updates
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 150));
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, progress } : f
          )
        );
      }

      // Simulate success/error
      const success = Math.random() > 0.15; // 85% success rate
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
        successCount++;
      } else {
        errorCount++;
      }
    }

    setIsUploading(false);
    setUploadComplete(true);
    
    // Show final results
    if (successCount > 0 && errorCount === 0) {
      toast.success(`🎉 All ${successCount} files uploaded successfully!`);
    } else if (successCount > 0 && errorCount > 0) {
      toast.success(`${successCount} files uploaded successfully, ${errorCount} failed`);
    } else if (errorCount > 0) {
      toast.error(`All ${errorCount} uploads failed. Please try again.`);
    }

    // Auto-navigate after successful uploads
    if (successCount > 0) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  };

  const isValid = useMemo(
    () =>
      files.length > 0 &&
      files.every(
        (file) =>
          file.metadata.title.trim() &&
          file.metadata.tags.length > 0 &&
          file.metadata.category
      ),
    [files]
  );

  const handleFileInput = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = [...SUPPORTED_FORMATS.image, ...SUPPORTED_FORMATS.video].join(",");
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      handleFiles(files);
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Upload Media
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Share your creative work with the OpenLens community. Upload photos and videos with rich metadata and licensing options.
          </p>
        </motion.div>

        {/* Drop Zone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleFileInput}
          className={`mb-8 flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-300 ${
            isDragging
              ? "border-blue-500 bg-blue-50 scale-105 shadow-xl dark:border-blue-400 dark:bg-blue-950/50"
              : "border-gray-300 bg-white/80 backdrop-blur-sm hover:border-blue-400 hover:bg-blue-50/50 hover:scale-102 shadow-lg dark:border-gray-700 dark:bg-gray-800/80 dark:hover:border-blue-600"
          }`}
        >
          <motion.div
            animate={isDragging ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className={`rounded-full p-6 mb-4 ${
              isDragging 
                ? "bg-blue-100 dark:bg-blue-900/50" 
                : "bg-gray-100 dark:bg-gray-800"
            }`}>
              <svg
                className={`h-16 w-16 ${
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
            </div>
          </motion.div>
          
          <div className="text-center">
            <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {isDragging ? "Drop files here" : "Drag files here or click to browse"}
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Supports images and videos up to 50MB each
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-400">
              <span className="px-3 py-1 bg-gray-100 rounded-full dark:bg-gray-800">JPG</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full dark:bg-gray-800">PNG</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full dark:bg-gray-800">GIF</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full dark:bg-gray-800">WebP</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full dark:bg-gray-800">MP4</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full dark:bg-gray-800">WebM</span>
            </div>
          </div>
        </motion.div>

        {/* Upload Stats */}
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-xl bg-white/80 backdrop-blur-sm p-6 shadow-lg dark:bg-gray-800/80"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">{files.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Files</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {files.filter(f => f.status === "success").length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Uploaded</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  {files.filter(f => f.status === "uploading").length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {files.filter(f => f.status === "error").length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Failed</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* File Cards */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  File Details
                </h2>
                <button
                  onClick={() => setFiles([])}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Clear All
                </button>
              </div>
              <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
                {files.map((file, index) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <FileUploadCard
                      file={file}
                      onUpdate={updateFileMetadata}
                      onRemove={removeFile}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="sticky bottom-8 z-10"
            >
              <div className="flex justify-center">
                <div className="rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-2xl dark:bg-gray-800/90">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {!isValid && (
                      <p className="text-sm text-amber-600 dark:text-amber-400 text-center">
                        Please fill in title, category, and at least one tag for each file
                      </p>
                    )}
                    <Button
                      onClick={handleSubmit}
                      disabled={!isValid || isUploading}
                      isLoading={isUploading}
                      size="lg"
                      className="min-w-[200px] text-lg font-semibold"
                    >
                      {isUploading 
                        ? `Uploading ${files.filter(f => f.status === "uploading").length} files...`
                        : uploadComplete
                        ? "Upload Complete! 🎉"
                        : `Upload ${files.length} ${files.length === 1 ? "file" : "files"}`
                      }
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Animation */}
        <AnimatePresence>
          {uploadComplete && files.every(f => f.status === "success") && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="rounded-2xl bg-white p-8 text-center shadow-2xl dark:bg-gray-800"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <svg
                      className="h-8 w-8 text-green-600 dark:text-green-400"
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
                  </div>
                </motion.div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  Upload Successful! 🎉
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your media has been uploaded and is now available in your dashboard.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

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
