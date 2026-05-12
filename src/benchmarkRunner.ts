// Imports dataset generation, algorithms, timing, system info, and scoreboard utilities.
import { generateDataset } from "./dataGenerator";
import {
  bubbleSort,
  constantTime,
  linearSearch,
  mergeSort,
} from "./algorithms";
import { measureExecutionTime } from "./timer";
import { getSystemInfo } from "./systemInfo";
import { saveResult } from "./scoreboard";
import { BenchmarkResult, DatasetType } from "./types";
import { benchmarkPresets } from "./benchmarkPresets";

// Defines a reusable algorithm function type.
type AlgorithmFunction = (data: number[]) => unknown;

// Defines the available benchmark size selections.
export type BenchmarkSizeOption = "small" | "medium" | "large";

// Runs a benchmark, measures execution time, and records the result.
export function runBenchmark(
  algorithmName: string,
  algorithmFunction: AlgorithmFunction,
  data: number[],
  user: string,
  cpu: string,
  datasetSize: number,
  datasetType: DatasetType
): void {
  const { result, timeMs } = measureExecutionTime(() =>
    algorithmFunction(data)
  );

  console.log(`${algorithmName} Time: ${timeMs.toFixed(4)} ms`);

  if (Array.isArray(result)) {
    console.log(`${algorithmName} first 5:`, result.slice(0, 5));
  } else {
    console.log(`${algorithmName} Result:`, result);
  }

  const benchmarkResult: BenchmarkResult = {
    user,
    cpu,
    algorithm: algorithmName,
    datasetSize,
    datasetType,
    timeMs: Number(timeMs.toFixed(4)),
    date: new Date().toISOString(),
  };

  const savedToScoreboard = saveResult(benchmarkResult);

  if (savedToScoreboard) {
    console.log("* New Top Benchmark Recorded *");
  }
}

// Runs a preset benchmark using the selected algorithm, size, and dataset type.
export function runPresetBenchmark(
  algorithmName: string,
  sizeOption: BenchmarkSizeOption,
  datasetType: DatasetType
): void {
  const system = getSystemInfo();

  const selectedPreset = benchmarkPresets.find(
    (preset) => preset.algorithmName === algorithmName
  );

  if (!selectedPreset) {
    console.log("Preset not found.");
    return;
  }

  const algorithmMap = {
    "O(1)": constantTime,
    "Linear Search": linearSearch,
    "Bubble Sort": bubbleSort,
    "Merge Sort": mergeSort,
  };

    
  const sizeIndexMap = {
    small: 0,
    medium: 1,
    large: 2,
  };

  const selectedSize =
    selectedPreset.datasetSizes[sizeIndexMap[sizeOption]];

  const selectedAlgorithm =
    algorithmMap[algorithmName as keyof typeof algorithmMap];

  if (!selectedAlgorithm) {
    console.log("Algorithm not found.");
    return;
  }

  const data = generateDataset(selectedSize, datasetType);

  console.log(`=== ${selectedPreset.algorithmName} Benchmark ===`);
  console.log();

  console.log(`Dataset size: ${selectedSize}`);
  console.log(`Dataset type: ${datasetType}`);
  console.log();

  runBenchmark(
    selectedPreset.algorithmName,
    selectedAlgorithm,
    data,
    system.username,
    system.cpu,
    selectedSize,
    datasetType
  );

  console.log();
}