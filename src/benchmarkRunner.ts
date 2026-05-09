import { generateDataset, DatasetType } from "./dataGenerator";
import { bubbleSort, constantTime, mergeSort } from "./algorithms";
import { measureExecutionTime } from "./timer";
import { getSystemInfo } from "./systemInfo";
import { saveResult } from "./scoreboard";
import { BenchmarkResult } from "./types";
import { benchmarkPresets } from "./benchmarkPresets";

// Defines a generic algorithm function type.
type AlgorithmFunction = (data: number[]) => unknown;

// Runs and records a benchmark for a selected algorithm.
export function runBenchmark(
  algorithmName: string,
  algorithmFunction: AlgorithmFunction,
  data: number[],
  user: string,
  cpu: string,
  datasetSize: number,
  datasetType: DatasetType
): void {
  // Measures algorithm execution time and stores the result.
  const { result, timeMs } = measureExecutionTime(() =>
    algorithmFunction(data)
  );

  // Displays benchmark execution time.
  console.log(`${algorithmName} Time: ${timeMs.toFixed(4)} ms`);

  // Displays the first 5 array results if the algorithm returns an array.
  if (Array.isArray(result)) {
    console.log(`${algorithmName} first 5:`, result.slice(0, 5));
  } else {
    // Displays the returned result for non-array algorithms.
    console.log(`${algorithmName} Result:`, result);
  }

  // Creates a benchmark result object for scoreboard storage.
  const benchmarkResult: BenchmarkResult = {
    user,
    cpu,
    algorithm: algorithmName,
    datasetSize,
    datasetType,
    timeMs: Number(timeMs.toFixed(4)),
    date: new Date().toISOString(),
  };

  // Saves qualifying results to the Top 5 scoreboard.
  const savedToScoreboard = saveResult(benchmarkResult);

  // Displays a message if the result qualified for the Top 5.
  if (savedToScoreboard) {
    console.log("* New Top Benchmark Recorded *");
  }
}

// Runs all preset benchmark sizes for a selected algorithm.
export function runPresetBenchmark(algorithmName: string): void {
  // Retrieves current system information.
  const system = getSystemInfo();

  // Finds the benchmark preset that matches the selected algorithm.
  const selectedPreset = benchmarkPresets.find(
    (preset) => preset.algorithmName === algorithmName
  );

  // Stops execution if the preset is not found.
  if (!selectedPreset) {
    console.log("Preset not found.");
    return;
  }

  // Maps menu/preset algorithm names to their actual function.
  const algorithmMap = {
    "O(1)": constantTime,
    "Bubble Sort": bubbleSort,
    "Merge Sort": mergeSort,
  };

  // Selects the matching algorithm function.
  const selectedAlgorithm =
    algorithmMap[algorithmName as keyof typeof algorithmMap];

  // Stops execution if the algorithm function is not found.
  if (!selectedAlgorithm) {
    console.log("Algorithm not found.");
    return;
  }

  // Displays benchmark section title.
  console.log(`=== ${selectedPreset.algorithmName} Benchmark ===`);
  console.log();

  // Runs benchmarks for each dataset size in the preset.
  for (const size of selectedPreset.datasetSizes) {
    // Generates benchmark dataset.
    const data = generateDataset(size, selectedPreset.datasetType);

    // Displays dataset information.
    console.log(`Dataset size: ${size}`);
    console.log(`Dataset type: ${selectedPreset.datasetType}`);
    console.log();

    // Executes benchmark for the current dataset.
    runBenchmark(
      selectedPreset.algorithmName,
      selectedAlgorithm,
      data,
      system.username,
      system.cpu,
      size,
      selectedPreset.datasetType
    );

    console.log();
  }
}