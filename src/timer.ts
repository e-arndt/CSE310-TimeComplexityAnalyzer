/*
* Measures execution time of a function in milliseconds.
*/
export function measureExecutionTime<T>(
  fn: () => T
): { result: T; timeMs: number } {

  const start = performance.now();

  const result = fn();

  const end = performance.now();

  return {
    result,
    timeMs: end - start, // Simple difference between end and start gives us the elapsed time in milliseconds
  };
}