import type React from "react";
import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslationContext } from "@/contexts/translation-context";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

export default function FileUploader({ onFileUpload }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslationContext();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files?.length > 0) {
        handleFile(e.target.files[0]);
      }
    }
  };

  const handleFile = (file: File) => {
    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      onFileUpload(file);
    } else {
      alert(t.upload_error);
    }
  };

  const openFileDialog = () => fileInputRef.current?.click();

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragging
          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
          : "border-gray-300 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={openFileDialog}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept=".txt"
        className="hidden"
      />

      <div className="flex flex-col items-center space-y-4">
        <div
          className={`p-3 rounded-full ${
            isDragging
              ? "bg-green-100 dark:bg-green-800"
              : "bg-gray-100 dark:bg-gray-700"
          }`}>
          <Upload
            className={`h-6 w-6 ${
              isDragging
                ? "text-green-600 dark:text-green-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          />
        </div>

        <div>
          <p className="text-sm font-medium">
            {isDragging ? t.upload_drop_active : t.upload_drop}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {t.upload_click}
          </p>
        </div>

        <Button variant="outline" size="sm" className="mt-2">
          {t.upload_button}
        </Button>
      </div>
    </div>
  );
}
