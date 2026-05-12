// Imports the main menu system.
import { startMenu } from "./menu";

// Main application start point.
async function main() {
  // Clears the terminal window.
  console.clear();

  // Starts the interactive CLI / Terminal menu.
  await startMenu();
}

// Starts the application.
main();