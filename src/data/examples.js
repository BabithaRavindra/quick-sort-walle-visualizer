/**
 * Standard test examples for Quick Sort Simulator
 * Specifically designed for DAA CIA 3(B) Viva and Demonstrations
 */

export const EXAMPLES = [
  {
    id: "standard",
    name: "CIA 3(B) Standard Example",
    array: [38, 12, 27, 43, 9, 31, 18],
    description: "Standard 7-element array with multiple partitions and balanced recursion. Perfect for demonstration."
  },
  {
    id: "reverse",
    name: "Worst Case: Reverse Sorted",
    array: [5, 4, 3, 2, 1],
    description: "Reverse sorted array. With Lomuto partition (last element as pivot), the pivot is always the minimum, creating O(n²) worst-case behavior."
  },
  {
    id: "sorted",
    name: "Worst Case: Already Sorted",
    array: [1, 2, 3, 4, 5],
    description: "Already sorted array. The pivot is always the maximum, resulting in unbalanced partitions of size (n-1) and 0 (O(n²))."
  },
  {
    id: "duplicates",
    name: "Array with Duplicates",
    array: [5, 5, 3, 8, 5, 2],
    description: "Contains multiple 5s to show how elements equal to the pivot (arr[j] <= pivot) are grouped to the left."
  },
  {
    id: "random_small",
    name: "Balanced Mix",
    array: [25, 10, 45, 15, 30, 5],
    description: "Even-sized array demonstrating clear left and right subarray division."
  },
  {
    id: "single",
    name: "Base Case: Single Element",
    array: [42],
    description: "Trivial 1-element array demonstrating base case handling where low == high."
  }
];

if (typeof window !== "undefined") {
  window.EXAMPLES = EXAMPLES;
}
