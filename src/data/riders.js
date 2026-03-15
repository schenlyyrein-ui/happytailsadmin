const STORAGE_KEY = 'happytails_riders';

const defaultRiders = [
  { id: 'RID-001', name: 'Mark Dela Cruz', contact: '0917-123-4567', vehicle: 'Motorcycle', plateNumber: 'ABC-1234' },
  { id: 'RID-002', name: 'Ana Reyes', contact: '0918-234-5678', vehicle: 'Scooter', plateNumber: 'XYZ-9876' }
];

export function getRiders() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultRiders));
      return defaultRiders;
    }

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultRiders;
  } catch (error) {
    return defaultRiders;
  }
}

export function saveRiders(riders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(riders));
}
