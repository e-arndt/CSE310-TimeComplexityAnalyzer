// Node module to access system information from the operating system
import * as os from "os";

/*
*  SystemInfo describes the structure for the system information we want to retrieve.
*/
export interface SystemInfo {
  username: string;
  cpu: string;
  cores: number;
  platform: string;
}

/*
* Retrieves system information such as username, CPU model, number of cores, and platform.
*/
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