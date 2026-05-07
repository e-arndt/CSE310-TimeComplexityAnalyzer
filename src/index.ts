import { generateDataset, DatasetType } from "./dataGenerator";
import { bubbleSort, constantTime, mergeSort } from "./algorithms";
import { measureExecutionTime } from "./timer";
import { getSystemInfo } from "./systemInfo";
import { saveResult } from "./scoreboard";
import { BenchmarkResult } from "./types";
import { getTopResults } from "./scoreboard";

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

  console.log(`${algorithmName} Time: ${timeMs.toFixed(3)} ms`);

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

  saveResult(benchmarkResult);
}

function displayTopResults(
  algorithmName: string,
  datasetSize: number,
  datasetType: DatasetType
): void {
  const topResults = getTopResults(algorithmName, datasetSize, datasetType);

  console.log(`=== Top 10 ${algorithmName} Results ===`);
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
  console.log("=== Time Complexity Analyzer ===");

  const size = 50000;
  const datasetType: DatasetType = "random";

  const data = generateDataset(size, datasetType);

  console.clear();

  console.log("=== Time Complexity Analyzer ===");

  console.log(`Dataset size: ${size}`);
  console.log(`Dataset type: ${datasetType}`);
  console.log();

  const system = getSystemInfo();

  runBenchmark(
    "O(1)",
    constantTime,
    data,
    system.username,
    system.cpu,
    size,
    datasetType
  );

  console.log();

  runBenchmark(
    "Bubble Sort",
    bubbleSort,
    data,
    system.username,
    system.cpu,
    size,
    datasetType
  );
  displayTopResults("Bubble Sort", size, datasetType);
  console.log();

  runBenchmark(
    "Merge Sort",
    mergeSort,
    data,
    system.username,
    system.cpu,
    size,
    datasetType
  );

  console.log();

  console.log("=== System Information ===");
  console.log(`User: ${system.username}`);
  console.log(`CPU: ${system.cpu}`);
  console.log();
}

main();