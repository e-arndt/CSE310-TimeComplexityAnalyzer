// Constant Time - O(1): returns the first item directly, no matter how large the dataset is.
// This is simulating a constant time operation, like a dictionary lookup or accessing an array index.
export function constantTime(data: number[]): number {
  return data[0];
}

// Linear Search - O(n): checks each item one at a time until it finds the target value.
export function linearSearch(data: number[]): number {
  const target = data[data.length - 1];

  for (let i = 0; i < data.length; i++) {
    if (data[i] === target) {
      return i;
    }
  }

  // The search function returns the index of where the target was found, or -1 if it was not found in the dataset.
  // Another function can then get the contents of that index for further processing as desired.
  return -1;
}

// Bubble Sort - O(n²): repeatedly compares neighboring values and swaps them into order.
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

  // Return the sorted or arranged COPY of the array, leaving the original array of data unchanged.
  return arr;
}

// Merge Sort - O(n log n): recursively splits the dataset, sorts each half, and merges the sorted halves.
export function mergeSort(data: number[]): number[] {
  if (data.length <= 1) {
    return data;
  }

  const middle = Math.floor(data.length / 2);

  const left = mergeSort(data.slice(0, middle));
  const right = mergeSort(data.slice(middle));

  return merge(left, right);
}

// Merge step for Merge Sort: combines two already-sorted arrays into one sorted result.
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

  // No nested arrays here, just spread the remaining items from left and right into the result.
  return [
    ...result,
    ...left.slice(leftIndex),
    ...right.slice(rightIndex),
  ];
}