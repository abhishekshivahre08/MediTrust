export interface MedicineRecord {
  id: string;
  name: string;
  manufacturer: string;
  batch?: string;
}

export const AUTHENTIC_MEDICINES: MedicineRecord[] = [
  { id: "MED001", name: "Paracetamol 500mg", manufacturer: "Cipla" },
  { id: "MED002", name: "Amoxicillin 250mg", manufacturer: "Sun Pharma" },
  { id: "MED003", name: "Azithromycin 500mg", manufacturer: "Dr. Reddy's" },
  { id: "MED004", name: "Metformin 500mg", manufacturer: "Torrent Pharma" },
];

export const findMedicineById = (input: string | null | undefined) => {
  if (!input) return undefined;
  const trimmed = input.trim();
  if (!trimmed) return undefined;

  const maybeJson = parseJson(trimmed);
  const candidateId = maybeJson?.id ?? trimmed;
  const normalized = candidateId.toString().trim().toUpperCase();

  return AUTHENTIC_MEDICINES.find(
    (item) => item.id.toUpperCase() === normalized,
  );
};

const parseJson = (raw: string): Partial<MedicineRecord> | undefined => {
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === "object" && parsed !== null) {
      return parsed as Partial<MedicineRecord>;
    }
  } catch (error) {
    return undefined;
  }
  return undefined;
};
