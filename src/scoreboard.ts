import fs from "fs";
import path from "path";
import { BenchmarkResult } from "./types";

const resultsDir = path.join(process.cwd(), "results");
const scoreboardPath = path.join(resultsDir, "scoreboard.json");
const SCOREBOARD_LIMIT = 5;

// Saves a benchmark result if it qualifies for the Top 5 scoreboard.
export function saveResult(result: BenchmarkResult): boolean {
  const results = loadResults();

  const sameCategory = results.filter((entry) =>
    isSameCategory(entry, result)
  );

  const otherCategories = results.filter(
    (entry) => !isSameCategory(entry, result)
  );

  const qualifies =
    sameCategory.length < SCOREBOARD_LIMIT ||
    result.timeMs < getSlowestTime(sameCategory);

  if (!qualifies) {
    return false;
  }

  const updatedCategory = [...sameCategory, result]
    .sort((a, b) => a.timeMs - b.timeMs)
    .slice(0, SCOREBOARD_LIMIT);

  const updatedResults = [...otherCategories, ...updatedCategory];

  writeResults(updatedResults);

  return true;
}

// Loads all saved benchmark results from the scoreboard file.
export function loadResults(): BenchmarkResult[] {
  if (!fs.existsSync(scoreboardPath)) {
    return [];
  }

  const fileContents = fs.readFileSync(scoreboardPath, "utf-8");

  return JSON.parse(fileContents) as BenchmarkResult[];
}

// Returns the top benchmark results for a specific algorithm and dataset category.
export function getTopResults(
  algorithm: string,
  datasetSize: number,
  datasetType: string,
  limit: number = SCOREBOARD_LIMIT
): BenchmarkResult[] {
  return loadResults()
    .filter(
      (result) =>
        result.algorithm === algorithm &&
        result.datasetSize === datasetSize &&
        result.datasetType === datasetType
    )
    .sort((a, b) => a.timeMs - b.timeMs)
    .slice(0, limit);
}

// Checks whether two benchmark results belong to the same category.
function isSameCategory(
  a: BenchmarkResult,
  b: BenchmarkResult
): boolean {
  return (
    a.algorithm === b.algorithm &&
    a.datasetSize === b.datasetSize &&
    a.datasetType === b.datasetType
  );
}

// Returns the slowest execution time in a benchmark category.
function getSlowestTime(results: BenchmarkResult[]): number {
  return Math.max(...results.map((entry) => entry.timeMs));
}

// Writes benchmark results to the scoreboard JSON file.
function writeResults(results: BenchmarkResult[]): void {
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir);
  }

  fs.writeFileSync(scoreboardPath, JSON.stringify(results, null, 2));
}