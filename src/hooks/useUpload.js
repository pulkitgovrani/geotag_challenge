import { useState } from "react";
import { cloudinaryService } from "../services/cloudinaryService";
import { apiService } from "../services/apiService";
import { usePlants } from "./usePlants";
import { useNotification } from "./useNotification";

export const useUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { plants, addPlant } = usePlants();
  const { showSuccess, showError, showWarning } = useNotification();

  const isDuplicatePlant = (imageName, latitude, longitude) => {
    return plants.some((plant) => {
      if (plant.imageName === imageName) {
        return true;
      }
      const latDiff = Math.abs(plant.latitude - latitude);
      const lngDiff = Math.abs(plant.longitude - longitude);
      const tolerance = 0.00001;

      if (latDiff < tolerance && lngDiff < tolerance) {
        return true;
      }

      return false;
    });
  };

  const uploadFiles = async (files) => {
    setUploading(true);
    const fileArray = Array.from(files);

    const results = {
      uploaded: [],
      duplicates: [],
      failed: [],
    };

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
          const { latitude, longitude } = locationResult.data;
          if (isDuplicatePlant(file.name, latitude, longitude)) {
            results.duplicates.push(file.name);
            console.log(`Skipping duplicate: ${file.name}`);
            continue;
          }

          const plantData = {
            imageName: file.name,
            imageUrl: cloudinaryResult.secure_url,
            latitude,
            longitude,
          };

          // Save to backend
          const saveResult = await apiService.savePlantData(plantData);

          if (saveResult.success) {
            addPlant({
              id: saveResult.data.id || Date.now().toString(),
              ...saveResult.data,
              uploadedAt: new Date().toISOString(),
            });
            results.uploaded.push(file.name);
          } else {
            results.failed.push(file.name);
          }
        } else {
          results.failed.push(file.name);
        }
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
        results.failed.push(file.name);
      }
    }

    setUploading(false);
    if (results.uploaded.length > 0) {
      showSuccess(
        `Successfully uploaded ${results.uploaded.length} plant image${
          results.uploaded.length > 1 ? "s" : ""
        }`
      );
    }

    if (results.duplicates.length > 0) {
      const duplicateNames = results.duplicates.slice(0, 3).join(", ");
      const remaining =
        results.duplicates.length > 3
          ? ` and ${results.duplicates.length - 3} more`
          : "";
      showWarning(
        `Skipped ${results.duplicates.length} duplicate image${
          results.duplicates.length > 1 ? "s" : ""
        }: ${duplicateNames}${remaining}`
      );
    }

    if (results.failed.length > 0) {
      const failedNames = results.failed.slice(0, 3).join(", ");
      const remaining =
        results.failed.length > 3
          ? ` and ${results.failed.length - 3} more`
          : "";
      showError(
        `Failed to upload ${results.failed.length} image${
          results.failed.length > 1 ? "s" : ""
        }: ${failedNames}${remaining}`
      );
    }
  };

  return { uploading, uploadFiles };
};
