import React from "react";
import { MapPin, Trash2, Calendar } from "lucide-react";
import { Button } from "../common/Button";

export const PlantCard = ({ plant, onDelete, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
    >
      <div className="relative overflow-hidden">
        <img
          src={plant.imageUrl}
          alt={plant.imageName}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
          Active
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 truncate mb-3">
          {plant.imageName}
        </h3>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-green-600" />
            <span>Lat: {plant.latitude?.toFixed(5)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-green-600" />
            <span>Lng: {plant.longitude?.toFixed(5)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-gray-400" />
            <span className="text-xs">
              {new Date(plant.uploadedAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <Button
          variant="danger"
          size="sm"
          icon={Trash2}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(plant.id);
          }}
          className="w-full"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
