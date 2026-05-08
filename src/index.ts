import { generateDataset, DatasetType } from "./dataGenerator";
import { bubbleSort, constantTime, mergeSort } from "./algorithms";
import { measureExecutionTime } from "./timer";
import { getSystemInfo } from "./systemInfo";
import { saveResult } from "./scoreboard";
import { getTopResults } from "./scoreboard";
import { BenchmarkResult } from "./types";
import { benchmarkPresets } from "./benchmarkPresets";

type AlgorithmFunction<T> = (data: number[]) => T;

function runBenchmark<T>(
  algorithmName: string,
  algorithmFunction: AlgorithmFunction<T>,
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

function displayTopResults(
  algorithmName: string,
  datasetSize: number,
  datasetType: DatasetType
): void {
  const topResults = getTopResults(algorithmName, datasetSize, datasetType);

  console.log(`=== Top 5 ${algorithmName} Results ===`);
  console.log(`Dataset: ${datasetSize} ${datasetType} numbers`);

  if (topResults.length === 0) {
    console.log("No saved results yet.");
    return;
  }

  topResults.forEach((result, index) => {
    console.log(
      `${index + 1}. ${result.user} - ${result.cpu} - ${result.timeMs} ms`
    );
  });
}

async function main() {
  console.clear();

  console.log("=== Time Complexity Analyzer ===");
  console.log();

  const system = getSystemInfo();

  console.log("=== System Information ===");
  console.log(`User: ${system.username}`);
  console.log(`CPU: ${system.cpu}`);
  console.log();

  const selectedPreset = benchmarkPresets.find(
    (preset) => preset.algorithmName === "Bubble Sort"
  );

  if (!selectedPreset) {
    console.log("Preset not found.");
    return;
  }

  console.log(`=== ${selectedPreset.algorithmName} Benchmark ===`);
  console.log();

  for (const size of selectedPreset.datasetSizes) {
    const data = generateDataset(size, selectedPreset.datasetType);

    console.log(`Dataset size: ${size}`);
    console.log(`Dataset type: ${selectedPreset.datasetType}`);
    console.log();

    runBenchmark(
      selectedPreset.algorithmName,
      bubbleSort,
      data,
      system.username,
      system.cpu,
      size,
      selectedPreset.datasetType
    );

    console.log();
  }
}

main();