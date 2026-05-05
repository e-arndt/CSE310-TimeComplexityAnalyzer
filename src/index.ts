import { generateDataset } from "./dataGenerator";
import { constantTime } from "./algorithms";

async function main() {
  console.log("=== Time Complexity Analyzer ===");

  const size = 10000;
  const data = generateDataset(size);

  console.log(`Dataset size: ${size}`);

  const result = constantTime(data);

  console.log("O(1) Result:", result);
}

main();