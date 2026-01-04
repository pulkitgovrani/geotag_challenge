import { STORAGE_KEYS } from "../utils/constants";

export const storageService = {
  savePlants(plants) {
    localStorage.setItem(STORAGE_KEYS.PLANTS, JSON.stringify(plants));
  },

  loadPlants() {
    const data = localStorage.getItem(STORAGE_KEYS.PLANTS);
    return data ? JSON.parse(data) : [];
  },

  savePreferences(prefs) {
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(prefs));
  },

  loadPreferences() {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return data ? JSON.parse(data) : {};
  },

  clear() {
    localStorage.removeItem(STORAGE_KEYS.PLANTS);
  },
};
