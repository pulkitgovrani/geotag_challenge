import React from "react";
import { CheckCircle, XCircle, Loader } from "lucide-react";

export const UploadProgress = ({ files }) => {
  if (files.length === 0) return null;

  return (
    <div className="space-y-3 mt-6">
      <h3 className="font-semibold text-gray-800">Upload Progress</h3>
      {files.map((file) => (
        <div key={file.id} className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 truncate flex-1">
              {file.name}
            </span>
            {file.status === "uploading" && (
              <Loader className="animate-spin text-green-600" size={20} />
            )}
            {file.status === "success" && (
              <CheckCircle className="text-green-600" size={20} />
            )}
            {file.status === "error" && (
              <XCircle className="text-red-600" size={20} />
            )}
          </div>

          {file.status === "uploading" && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${file.progress}%` }}
              />
            </div>
          )}

          {file.status === "error" && (
            <p className="text-xs text-red-600 mt-1">{file.error}</p>
          )}
        </div>
      ))}
    </div>
  );
};
