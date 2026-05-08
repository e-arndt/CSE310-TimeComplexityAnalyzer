// Creates a custom TypeScript type for the dataset types to be supported in benchmarks
// using a union of string literals to restrict values to specific dataset types
// Only one type is allowed per dataset, ensuring clear categorization of benchmark results
export type DatasetType = "random" | "sorted" | "reverse" | "nearly-sorted" | "duplicates";

// Defines the structure of a benchmark result, including user info, algorithm details, and performance metrics
export interface BenchmarkResult {
  user: string;
  cpu: string;
  algorithm: string;
  datasetSize: number;
  datasetType: string;
  timeMs: number;
  date: string;
}
