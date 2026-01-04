import React from "react";
import { MapPin, Calendar, Image } from "lucide-react";
import { Modal } from "../common/Modal";

export const PlantDetailModal = ({ plant, isOpen, onClose }) => {
  if (!plant) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Plant Details" size="lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={plant.imageUrl}
            alt={plant.imageName}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Image size={16} />
              Image Name
            </label>
            <p className="text-gray-800 mt-1">{plant.imageName}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <MapPin size={16} />
              Latitude
            </label>
            <p className="text-gray-800 mt-1 font-mono">{plant.latitude}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <MapPin size={16} />
              Longitude
            </label>
            <p className="text-gray-800 mt-1 font-mono">{plant.longitude}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Calendar size={16} />
              Uploaded At
            </label>
            <p className="text-gray-800 mt-1">
              {new Date(plant.uploadedAt).toLocaleString()}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Image URL
            </label>
            <a
              href={plant.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline text-sm mt-1 block truncate"
            >
              {plant.imageUrl}
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
};
