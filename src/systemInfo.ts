// Imports the Node.js operating system module for retrieving system information.
import * as os from "os";

// Defines the structure for collected system information.
export interface SystemInfo {
  username: string;
  cpu: string;
  cores: number;
  platform: string;
}

// Retrieves the current user's system information.
export function getSystemInfo(): SystemInfo {
  const username = os.userInfo().username;

  const cpu = os.cpus()[0].model.trim(); // Get the model name of 1st CPU core since all cores usually have the same name

  const cores = os.cpus().length;

  const platform = os.platform();

  return {
    username,
    cpu,
    cores,
    platform,
  };
}