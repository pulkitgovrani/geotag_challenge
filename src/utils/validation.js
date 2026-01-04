import { CONFIG } from "../config/config";

export const validateFile = (file) => {
  if (!CONFIG.ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: "Invalid file type. Only JPG and PNG are allowed.",
    };
  }

  if (file.size > CONFIG.MAX_FILE_SIZE) {
    return { valid: false, error: "File size exceeds 10MB limit." };
  }

  return { valid: true };
};

export const validateFiles = (files) => {
  const errors = [];
  Array.from(files).forEach((file) => {
    const result = validateFile(file);
    if (!result.valid) {
      errors.push(`${file.name}: ${result.error}`);
    }
  });
  return errors;
};
