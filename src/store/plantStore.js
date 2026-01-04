import { useState, useEffect } from "react";

const initialState = {
  plants: [],
  loading: false,
  uploadProgress: {},
  filter: "all",
  sortBy: "date",
  selectedPlant: null,
  stats: {
    total: 0,
    uploadedToday: 0,
    avgLatitude: 0,
    avgLongitude: 0,
  },
};

let listeners = [];
let state = { ...initialState };

export const plantStore = {
  getState: () => state,

  setState: (newState) => {
    state = { ...state, ...newState };
    listeners.forEach((listener) => listener(state));
  },

  subscribe: (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },

  actions: {
    setPlants: (plants) => {
      const stats = calculateStats(plants);
      plantStore.setState({ plants, stats });
    },

    addPlant: (plant) => {
      const plants = [...state.plants, plant];
      const stats = calculateStats(plants);
      plantStore.setState({ plants, stats });
    },

    deletePlant: (id) => {
      const plants = state.plants.filter((p) => p.id !== id);
      const stats = calculateStats(plants);
      plantStore.setState({ plants, stats });
    },

    updatePlant: (id, updates) => {
      const plants = state.plants.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      );
      plantStore.setState({ plants });
    },

    setLoading: (loading) => plantStore.setState({ loading }),

    setUploadProgress: (id, progress) => {
      const uploadProgress = { ...state.uploadProgress, [id]: progress };
      plantStore.setState({ uploadProgress });
    },

    setFilter: (filter) => plantStore.setState({ filter }),

    setSortBy: (sortBy) => plantStore.setState({ sortBy }),

    setSelectedPlant: (plant) => plantStore.setState({ selectedPlant: plant }),
  },
};

function calculateStats(plants) {
  const today = new Date().toDateString();
  const uploadedToday = plants.filter(
    (p) => new Date(p.uploadedAt).toDateString() === today
  ).length;

  const avgLatitude =
    plants.length > 0
      ? plants.reduce((sum, p) => sum + p.latitude, 0) / plants.length
      : 0;

  const avgLongitude =
    plants.length > 0
      ? plants.reduce((sum, p) => sum + p.longitude, 0) / plants.length
      : 0;

  return {
    total: plants.length,
    uploadedToday,
    avgLatitude,
    avgLongitude,
  };
}
