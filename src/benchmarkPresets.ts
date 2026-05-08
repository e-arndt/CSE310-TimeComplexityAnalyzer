import { DatasetType } from "./types";

/*
  BenchmarkPreset describes the structure for a benchmark.

  Each preset has:
  - the algorithm name
  - the dataset size to be tested
  - the dataset type to be generated

*/
export interface BenchmarkPreset {
  algorithmName: string;
  datasetSizes: number[];
  datasetType: DatasetType;
}


/*
  benchmarkPresets contain predefined benchmark settings.

  Presets are used to:
  - keep benchmark sizes usable
  - avoid extremely slow test runs
  - provide consistent comparisons between algorithms
  - simplify menu options

  Allows each algorithm type to have its own safe dataset limits.
*/
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