const STORAGE_KEY = "designZones_v1";

const loadData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load design zones", error);
    return [];
  }
};

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save design zones", error);
  }
};

export const getDesignZones = async () => {
  return { data: loadData() };
};

export const getDesignZoneById = async (id) => {
  const zones = loadData();
  return { data: zones.find((zone) => zone.id === id) || null };
};

export const createDesignZone = async (zoneData) => {
  const zones = loadData();
  const newZone = {
    ...zoneData,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const updated = [newZone, ...zones];
  saveData(updated);
  return { data: newZone };
};

export const updateDesignZone = async (id, zoneData) => {
  const zones = loadData();
  const updated = zones.map((zone) =>
    zone.id === id ? { ...zone, ...zoneData, updatedAt: new Date().toISOString() } : zone
  );
  saveData(updated);
  return { data: updated.find((zone) => zone.id === id) || null };
};

export const deleteDesignZone = async (id) => {
  const zones = loadData();
  const updated = zones.filter((zone) => zone.id !== id);
  saveData(updated);
  return { data: updated };
};
