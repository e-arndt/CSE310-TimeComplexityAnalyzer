// Imports system information utility.
import { getSystemInfo } from "./systemInfo";

// Imports preset benchmark runner.
import { runPresetBenchmark } from "./benchmarkRunner";

// Main application entry point.
async function main() {
  // Clears the terminal window.
  console.clear();

  // Displays application title.
  console.log("=== Time Complexity Analyzer ===");
  console.log();

  // Retrieves current system information.
  const system = getSystemInfo();

  // Displays current system information.
  console.log("=== System Information ===");
  console.log(`User: ${system.username}`);
  console.log(`CPU: ${system.cpu}`);
  console.log();

  // Temporarily runs a small Bubble Sort benchmark until the menu system is added.
runPresetBenchmark("Bubble Sort", "small");
}

// Starts the application.
main();