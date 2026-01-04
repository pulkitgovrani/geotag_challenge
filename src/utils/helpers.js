export const calculateBounds = (plants) => {
  if (plants.length === 0) return null;

  const lats = plants.map((p) => p.latitude);
  const lngs = plants.map((p) => p.longitude);

  return {
    minLat: Math.min(...lats),
    maxLat: Math.max(...lats),
    minLng: Math.min(...lngs),
    maxLng: Math.max(...lngs),
  };
};

export const getPlantPosition = (plant, bounds) => {
  if (!bounds) return { x: 50, y: 50 };

  const latRange = bounds.maxLat - bounds.minLat || 0.001;
  const lngRange = bounds.maxLng - bounds.minLng || 0.001;

  const x = ((plant.longitude - bounds.minLng) / lngRange) * 80 + 10;
  const y = ((bounds.maxLat - plant.latitude) / latRange) * 80 + 10;

  return { x, y };
};

export const sortPlants = (plants, sortBy) => {
  const sorted = [...plants];

  switch (sortBy) {
    case "date":
      return sorted.sort(
        (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
      );
    case "latitude":
      return sorted.sort((a, b) => b.latitude - a.latitude);
    case "longitude":
      return sorted.sort((a, b) => b.longitude - a.longitude);
    case "name":
      return sorted.sort((a, b) => a.imageName.localeCompare(b.imageName));
    default:
      return sorted;
  }
};

export const exportToJSON = (data, filename) => {
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}-${new Date().toISOString()}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

export const exportToCSV = (plants) => {
  const headers = [
    "ID",
    "Image Name",
    "Latitude",
    "Longitude",
    "Upload Date",
    "Image URL",
  ];
  const rows = plants.map((p) => [
    p.id,
    p.imageName,
    p.latitude,
    p.longitude,
    new Date(p.uploadedAt).toLocaleString(),
    p.imageUrl,
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `farm-plants-${new Date().toISOString()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};
