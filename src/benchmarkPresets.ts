/*
  BenchmarkPreset describes the structure for a benchmark.

  Each preset has:
  - the algorithm name
  - the dataset size to be tested
*/
export interface BenchmarkPreset {
  algorithmName: string;
  datasetSizes: number[];
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
    algorithmName: "O(1)", // Constant Time
    datasetSizes: [50000, 500000, 1500000],
  },
  {
    algorithmName: "Linear Search", // O(n)
    datasetSizes: [10000, 500000, 1500000],
  },
  {
    algorithmName: "Bubble Sort", // O(n²)
    datasetSizes: [1000, 10000, 75000],
  },
  {
    algorithmName: "Merge Sort", // O(n log n)
    datasetSizes: [10000, 50000, 150000],
  },
];