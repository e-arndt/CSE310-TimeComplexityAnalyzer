import readline from "readline";
import { runPresetBenchmark, BenchmarkSizeOption } from "./benchmarkRunner";
import { getTopResults } from "./scoreboard";
import { benchmarkPresets } from "./benchmarkPresets";
import { DatasetType } from "./types";

// Creates the readline interface for terminal input and output.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Asks the user a question and returns their typed answer.
function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

// Clears the terminal screen.
function clearScreen(): void {
  console.clear();
}

// Pauses execution until the user presses Enter.
async function pause(): Promise<void> {
  await askQuestion("Press Enter to continue...");
}

// Starts the main menu loop.
export async function startMenu(): Promise<void> {
  let running = true;

  while (running) {
    clearScreen();

    console.log("=== Time Complexity Analyzer ===");
    console.log();
    console.log("1. Run Linear Search Benchmark");
    console.log("2. Run Bubble Sort Benchmark");
    console.log("3. Run Merge Sort Benchmark");
    console.log("4. Run O(1) Benchmark");
    console.log("5. View Top 5 Results");
    console.log("6. Exit");
    console.log();

    const choice = await askQuestion("Choose an option: ");

    console.log();

    switch (choice.trim()) {
      case "1":
        await handleRunBenchmark("Linear Search");
        break;
      case "2":
        await handleRunBenchmark("Bubble Sort");
        break;

      case "3":
        await handleRunBenchmark("Merge Sort");
        break;

      case "4":
        await handleRunBenchmark("O(1)");
        break;

      case "5":
        await handleViewTopResults();
        break;

      case "6":
        running = false;
        break;

      default:
        console.log("Invalid option. Please choose 1-6.");
        console.log();
        break;
    }
  }

  rl.close();
}

// Handles size and dataset selection, then runs the selected benchmark.
async function handleRunBenchmark(algorithmName: string): Promise<void> {
  const sizeOption = await chooseBenchmarkSize();

  if (!sizeOption) {
    return;
  }

  const datasetType = await chooseDatasetType();

  if (!datasetType) {
    return;
  }

  clearScreen();

  runPresetBenchmark(algorithmName, sizeOption, datasetType);

  await pause();
}

// Handles selecting an algorithm, size, and dataset type for Top 5 results.
async function handleViewTopResults(): Promise<void> {
  clearScreen();

  const algorithmName = await chooseAlgorithm();

  if (!algorithmName) {
    return;
  }

  const sizeOption = await chooseBenchmarkSize();

  if (!sizeOption) {
    return;
  }

  const datasetType = await chooseDatasetType();

  if (!datasetType) {
    return;
  }

  const selectedPreset = benchmarkPresets.find(
    (preset) => preset.algorithmName === algorithmName
  );

  if (!selectedPreset) {
    console.log("Preset not found.");
    console.log();
    return;
  }

  const selectedSize = getDatasetSizeFromOption(
    selectedPreset.datasetSizes,
    sizeOption
  );

  clearScreen();

  displayTopResults(algorithmName, selectedSize, datasetType);

  await pause();
}

// Lets the user choose an algorithm for viewing Top 5 results.
async function chooseAlgorithm(): Promise<string | null> {
  clearScreen();

  console.log("Choose algorithm:");
  console.log("1. Linear Search");
  console.log("2. Bubble Sort");
  console.log("3. Merge Sort");
  console.log("4. O(1)");
  console.log("5. Back");
  console.log();

  const choice = await askQuestion("Choose an option: ");

  switch (choice.trim()) {
    case "1":
      return "Linear Search";

    case "2":
      return "Bubble Sort";

    case "3":
      return "Merge Sort";

    case "4":
      return "O(1)";

    case "5":
      console.log();
      return null;

    default:
      console.log("Invalid option.");
      console.log();
      return null;
  }
}

// Lets the user choose a generic benchmark size.
async function chooseBenchmarkSize(): Promise<BenchmarkSizeOption | null> {
  clearScreen();

  console.log("Choose benchmark size:");
  console.log("1. Small");
  console.log("2. Medium");
  console.log("3. Large");
  console.log("4. Back");
  console.log();

  const choice = await askQuestion("Choose an option: ");

  switch (choice.trim()) {
    case "1":
      return "small";

    case "2":
      return "medium";

    case "3":
      return "large";

    case "4":
      console.log();
      return null;

    default:
      console.log("Invalid option.");
      console.log();
      return null;
  }
}

// Lets the user choose a dataset type.
async function chooseDatasetType(): Promise<DatasetType | null> {
  clearScreen();

  console.log("Choose dataset type:");
  console.log("1. Random");
  console.log("2. Reverse");
  console.log("3. Back");
  console.log();

  const choice = await askQuestion("Choose an option: ");

  switch (choice.trim()) {
    case "1":
      return "random";

    case "2":
      return "reverse";

    case "3":
      console.log();
      return null;

    default:
      console.log("Invalid option.");
      console.log();
      return null;
  }
}

// Converts a generic size option into the actual preset dataset size.
function getDatasetSizeFromOption(
  datasetSizes: number[],
  sizeOption: BenchmarkSizeOption
): number {
  const sizeIndexMap = {
    small: 0,
    medium: 1,
    large: 2,
  };

  return datasetSizes[sizeIndexMap[sizeOption]];
}

// Displays Top 5 results for a benchmark category.
function displayTopResults(
  algorithmName: string,
  datasetSize: number,
  datasetType: DatasetType
): void {
  const topResults = getTopResults(
    algorithmName,
    datasetSize,
    datasetType
  );

  console.log();
  console.log(`=== Top 5 ${algorithmName} Results ===`);
  console.log(`Dataset: ${datasetSize} ${datasetType} numbers`);
  console.log();

  if (topResults.length === 0) {
    console.log("No saved results yet.");
    console.log();
    return;
  }

  topResults.forEach((result, index) => {
    console.log(
      `${index + 1}. ${result.user} - ${result.cpu} - ${result.timeMs} ms`
    );
  });

  console.log();
}