import { DatasetType } from "./types";

/**
 * Generates a numeric dataset for algorithm testing.
 */
export function generateDataset(size: number, type: DatasetType = "random"): number[] {
  if (size <= 0) {
    throw new Error("Dataset size must be greater than 0.");
  }

  switch (type) {
    case "sorted":
      return generateSortedDataset(size);

    case "reverse":
      return generateReverseDataset(size);

    case "nearly-sorted":
      return generateNearlySortedDataset(size);

    case "duplicates":
      return generateDuplicateDataset(size);

    case "random":
    default:
      return generateRandomDataset(size);
  }
}

function generateSortedDataset(size: number): number[] {
  return Array.from({ length: size }, (_, i) => i);
}

function generateReverseDataset(size: number): number[] {
  return Array.from({ length: size }, (_, i) => size - i);
}

function generateRandomDataset(size: number): number[] {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * size * 10)
  );
}

function generateDuplicateDataset(size: number): number[] {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * 100)
  );
}

function generateNearlySortedDataset(size: number): number[] {
  const data = generateSortedDataset(size);
  const swaps = Math.max(1, Math.floor(size * 0.05));

  for (let i = 0; i < swaps; i++) {
    const indexA = Math.floor(Math.random() * size);
    const indexB = Math.floor(Math.random() * size);

    const temp = data[indexA];
    data[indexA] = data[indexB];
    data[indexB] = temp;
  }

  return data;
}