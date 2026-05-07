export type DatasetType = "random" | "sorted" | "reverse" | "nearly-sorted" | "duplicates";

export interface BenchmarkResult {
  user: string;
  cpu: string;
  algorithm: string;
  datasetSize: number;
  datasetType: string;
  timeMs: number;
  date: string;
}
