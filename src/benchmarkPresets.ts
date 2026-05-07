import { DatasetType } from "./types";

export interface BenchmarkPreset {
  algorithmName: string;
  datasetSizes: number[];
  datasetType: DatasetType;
}

export const benchmarkPresets: BenchmarkPreset[] = [
  {
    algorithmName: "O(1)",
    datasetSizes: [50000, 100000, 500000],
    datasetType: "random",
  },
  {
    algorithmName: "Bubble Sort",
    datasetSizes: [1000, 10000, 50000],
    datasetType: "random",
  },
  {
    algorithmName: "Merge Sort",
    datasetSizes: [10000, 50000, 100000],
    datasetType: "random",
  },
];