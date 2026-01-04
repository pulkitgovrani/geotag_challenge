import React, { useState } from "react";
import { Upload, Image } from "lucide-react";

export const DropZone = ({ onFilesSelected, disabled }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (!disabled && e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    if (!disabled && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
        disabled
          ? "border-gray-300 bg-gray-50 cursor-not-allowed"
          : dragActive
          ? "border-green-500 bg-green-50 scale-105"
          : "border-gray-300 hover:border-green-400 cursor-pointer"
      }`}
    >
      <input
        type="file"
        id="file-upload"
        multiple
        accept="image/jpeg,image/png,image/jpg"
        onChange={handleChange}
        className="hidden"
        disabled={disabled}
      />

      <label
        htmlFor="file-upload"
        className={disabled ? "cursor-not-allowed" : "cursor-pointer"}
      >
        {dragActive ? (
          <Image className="mx-auto mb-4 text-green-600" size={64} />
        ) : (
          <Upload className="mx-auto mb-4 text-green-600" size={64} />
        )}
        <p className="text-xl font-semibold text-gray-700 mb-2">
          {dragActive
            ? "Drop files here"
            : "Drop images here or click to upload"}
        </p>
        <p className="text-sm text-gray-500">
          Supports JPG, PNG with GPS data (Max 10MB per file)
        </p>
      </label>
    </div>
  );
};
