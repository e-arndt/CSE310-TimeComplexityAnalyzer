import * as os from "os";

export interface SystemInfo {
  username: string;
  cpu: string;
  cores: number;
  platform: string;
}

/**
 * Retrieves basic system information.
 */
export function getSystemInfo(): SystemInfo {
  const username = os.userInfo().username;

  const cpu = os.cpus()[0].model;

  const cores = os.cpus().length;

  const platform = os.platform();

  return {
    username,
    cpu,
    cores,
    platform,
  };
}