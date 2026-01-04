import { useState, useEffect } from "react";
import { plantStore } from "../store/plantStore";
import { storageService } from "../services/storageService";

export const usePlants = () => {
  const [state, setState] = useState(plantStore.getState());

  useEffect(() => {
    const unsubscribe = plantStore.subscribe(setState);

    // Load plants from storage on mount
    const savedPlants = storageService.loadPlants();
    if (savedPlants.length > 0) {
      plantStore.actions.setPlants(savedPlants);
    }

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Save plants to storage whenever they change
    storageService.savePlants(state.plants);
  }, [state.plants]);

  return {
    ...state,
    ...plantStore.actions,
  };
};
