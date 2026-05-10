// Imports the main menu system.
import { startMenu } from "./menu";

// Main application entry point.
async function main() {
  // Clears the terminal window.
  console.clear();

  // Starts the interactive CLI menu.
  await startMenu();
}

// Starts the application.
main();