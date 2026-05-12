import { DatasetType } from "./types";

// Generates a dataset based on the selected size and dataset type.
// Some dataset types are not currently used, but are available for future expansion.
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

// Generates an already sorted dataset in ascending order.
function generateSortedDataset(size: number): number[] {
  return Array.from({ length: size }, (_, i) => i);
}

// Generates a dataset sorted in descending order.
function generateReverseDataset(size: number): number[] {
  return Array.from({ length: size }, (_, i) => size - i);
}

// Generates a dataset with random numeric values.
function generateRandomDataset(size: number): number[] {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * size * 10)
  );
}

// Generates a dataset containing many duplicate values.
function generateDuplicateDataset(size: number): number[] {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * 100)
  );
}

// Generates a mostly sorted dataset with a small number of random swaps.
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