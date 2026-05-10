export function constantTime(data: number[]): number {
  return data[0];
}


/**
 * Linear Search - O(n)
 */
export function linearSearch(data: number[]): number {
  const target = data[data.length - 1];

  for (let i = 0; i < data.length; i++) {
    if (data[i] === target) {
      return i;
    }
  }

  return -1;
}

/**
 * Bubble Sort - O(n²)
 */
export function bubbleSort(data: number[]): number[] {
  const arr = [...data];

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

/**
 * Merge Sort - O(n log n)
 */
export function mergeSort(data: number[]): number[] {
  if (data.length <= 1) {
    return data;
  }

  const middle = Math.floor(data.length / 2);

  const left = mergeSort(data.slice(0, middle));
  const right = mergeSort(data.slice(middle));

  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];

  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return [
    ...result,
    ...left.slice(leftIndex),
    ...right.slice(rightIndex),
  ];
}