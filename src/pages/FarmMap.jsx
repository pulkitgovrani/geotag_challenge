import React, { useState } from "react";
import { ZoomIn, ZoomOut, Maximize2, Camera } from "lucide-react";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { PlantMarker } from "../components/plant/PlantMarker";
import { PlantDetailModal } from "../components/plant/PlantDetailModal";
import { usePlants } from "../hooks/usePlants";
import { calculateBounds, getPlantPosition } from "../utils/helpers";

export const FarmMap = () => {
  const { plants, setSelectedPlant, selectedPlant } = usePlants();
  const [zoom, setZoom] = useState(1);

  const bounds = calculateBounds(plants);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5));
  const handleReset = () => setZoom(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Farm Map</h1>
          <p className="text-gray-600">
            Interactive visualization of your crop locations
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={ZoomIn}
            onClick={handleZoomIn}
          >
            Zoom In
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={ZoomOut}
            onClick={handleZoomOut}
          >
            Zoom Out
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Maximize2}
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>

      <Card>
        {plants.length > 0 ? (
          <div className="relative overflow-hidden">
            <div
              className="relative w-full bg-gradient-to-br from-green-100 via-emerald-100 to-green-200 rounded-lg border-2 border-green-300 transition-transform duration-300"
              style={{
                height: "600px",
                transform: `scale(${zoom})`,
                transformOrigin: "center",
              }}
            >
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-10 grid-rows-10 h-full">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div key={i} className="border border-green-400" />
                  ))}
                </div>
              </div>

              {/* Plant markers */}
              {plants.map((plant) => {
                const position = getPlantPosition(plant, bounds);
                return (
                  <PlantMarker
                    key={plant.id}
                    plant={plant}
                    position={position}
                    onClick={setSelectedPlant}
                  />
                );
              })}

              {/* Legend */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Map Legend</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-600 rounded-full" />
                    <span className="text-gray-700">Plant Location</span>
                  </div>
                  <div className="text-gray-600 mt-2">
                    Total Plants:{" "}
                    <span className="font-semibold">{plants.length}</span>
                  </div>
                </div>
              </div>

              {/* Coordinates display */}
              {bounds && (
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg text-xs">
                  <div className="font-mono">
                    <div>
                      Lat: {bounds.minLat.toFixed(4)} -{" "}
                      {bounds.maxLat.toFixed(4)}
                    </div>
                    <div>
                      Lng: {bounds.minLng.toFixed(4)} -{" "}
                      {bounds.maxLng.toFixed(4)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <Camera className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Plants to Display
            </h3>
            <p className="text-gray-600 mb-6">
              Upload some plant images to see them on the map
            </p>
            <Button variant="primary" icon={Camera}>
              Upload Plants
            </Button>
          </div>
        )}
      </Card>

      <PlantDetailModal
        plant={selectedPlant}
        isOpen={!!selectedPlant}
        onClose={() => setSelectedPlant(null)}
      />
    </div>
  );
};
