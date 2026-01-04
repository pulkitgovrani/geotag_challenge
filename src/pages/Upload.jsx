import React, { useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Card } from "../components/common/Card";
import { DropZone } from "../components/upload/DropZone";
import { useUpload } from "../hooks/useUpload";
import { useNotification } from "../hooks/useNotification";
import { validateFiles } from "../utils/validation";

export const Upload = () => {
  const { uploading, uploadFiles } = useUpload();
  const { showError } = useNotification();
  const [uploadQueue, setUploadQueue] = useState([]);

  const handleFilesSelected = async (files) => {
    const errors = validateFiles(files);

    if (errors.length > 0) {
      errors.forEach((error) => showError(error));
      return;
    }

    const fileArray = Array.from(files).map((file) => ({
      id: `${file.name}-${Date.now()}`,
      name: file.name,
      status: "uploading",
      progress: 0,
      file,
    }));

    setUploadQueue(fileArray);
    await uploadFiles(files);

    // Clear queue after upload
    setTimeout(() => setUploadQueue([]), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Upload Plant Images
        </h1>
        <p className="text-gray-600">
          Upload geo-tagged images of your plants to track their locations on
          the farm
        </p>
      </div>

      <Card>
        <DropZone onFilesSelected={handleFilesSelected} disabled={uploading} />

        {uploadQueue.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="font-semibold text-gray-800">Upload Progress</h3>
            {uploadQueue.map((file) => (
              <div key={file.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 truncate flex-1">
                    {file.name}
                  </span>
                  {uploading && (
                    <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                  )}
                  {!uploading && (
                    <CheckCircle className="text-green-600" size={20} />
                  )}
                </div>
                {uploading && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full animate-pulse"
                      style={{ width: "75%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Instructions */}
      <Card title="Upload Instructions">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-2 rounded-lg mt-1">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-1">
                Ensure GPS Data
              </h4>
              <p className="text-sm text-gray-600">
                Make sure your images contain GPS EXIF data. Most modern
                smartphones automatically embed location data in photos.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg mt-1">
              <AlertCircle className="text-blue-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-1">
                Supported Formats
              </h4>
              <p className="text-sm text-gray-600">
                Upload JPG or PNG images. Maximum file size is 10MB per image.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-purple-100 p-2 rounded-lg mt-1">
              <CheckCircle className="text-purple-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-1">Batch Upload</h4>
              <p className="text-sm text-gray-600">
                You can select multiple images at once for faster processing.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
