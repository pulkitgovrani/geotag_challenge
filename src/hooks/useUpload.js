import { useState } from "react";
import { cloudinaryService } from "../services/cloudinaryService";
import { apiService } from "../services/apiService";
import { usePlants } from "./usePlants";
import { useNotification } from "./useNotification";

export const useUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { addPlant } = usePlants();
  const { showSuccess, showError } = useNotification();

  const uploadFiles = async (files) => {
    setUploading(true);
    const fileArray = Array.from(files);

    for (const file of fileArray) {
      try {
        // Upload to Cloudinary
        const cloudinaryResult = await cloudinaryService.uploadImage(
          file,
          (progress) => {
            console.log(`Upload progress: ${progress}%`);
          }
        );

        // Extract location
        const locationResult = await apiService.extractLocation(
          file.name,
          cloudinaryResult.secure_url
        );

        if (locationResult.success) {
          const plantData = {
            imageName: file.name,
            imageUrl: cloudinaryResult.secure_url,
            latitude: locationResult.data.latitude,
            longitude: locationResult.data.longitude,
          };

          // Save to backend
          const saveResult = await apiService.savePlantData(plantData);

          if (saveResult.success) {
            addPlant({
              id: saveResult.data.id || Date.now().toString(),
              ...saveResult.data,
              uploadedAt: new Date().toISOString(),
            });
            showSuccess(`${file.name} uploaded successfully`);
          }
        }
      } catch (error) {
        showError(`Failed to upload ${file.name}: ${error.message}`);
      }
    }

    setUploading(false);
  };

  return { uploading, uploadFiles };
};
