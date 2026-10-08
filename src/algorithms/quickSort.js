/**
 * Quick Sort with Lomuto Partition Scheme - Visualization Event Generator
 * For DAA CIA 3(B) Assignment
 *
 * Algorithm Rules:
 * 1. Pivot Selection: Always the last element of the current subarray (arr[high])
 * 2. Pointer i: Tracks boundary of elements <= pivot (initialized to low - 1)
 * 3. Pointer j: Scans elements from low to high - 1
 * 4. Comparison: If arr[j] <= pivot:
 *       i = i + 1
 *       swap arr[i] and arr[j]
 * 5. Pivot Placement: Swap arr[i + 1] and arr[high]
 * 6. Return pivotIndex = i + 1
 * 7. Recursively call QUICKSORT on [low, pivotIndex - 1] and [pivotIndex + 1, high]
 */

export class QuickSortEventGenerator {
  constructor(initialArray) {
    this.initialArray = [...initialArray];
    this.arr = [...initialArray];
    this.n = this.arr.length;
    this.steps = [];
    this.comparisons = 0;
    this.swaps = 0;
    this.pivotsSelected = 0;
    this.sortedIndices = new Set();
    this.callIdCounter = 0;
    this.callStack = [];
    this.callTreeNodes = [];
  }

  _recordStep({
    type,
    explanation,
    subExplanation,
    codeLine,
    low = -1,
    high = -1,
    pivotIndex = -1,
    pivotValue = null,
    i = -1,
    j = -1,
    activeIndices = [],
    comparingIndices = [],
    swappingIndices = [],
    stateTag = "normal",
    activeCallId = -1
  }) {
    // Determine partition regions for Section 9
    const smallerRegion = [];
    const greaterRegion = [];
    const unprocessedRegion = [];

    if (low >= 0 && high >= 0 && pivotIndex >= 0) {
      if (i >= low) {
        for (let idx = low; idx <= Math.min(i, high - 1); idx++) {
          smallerRegion.push(idx);
        }
      }
      if (i + 1 <= j - 1) {
        for (let idx = i + 1; idx <= Math.min(j - 1, high - 1); idx++) {
          greaterRegion.push(idx);
        }
      }
      if (j <= high - 1) {
        for (let idx = Math.max(j, low); idx < high; idx++) {
          unprocessedRegion.push(idx);
        }
      }
    }

    const step = {
      stepIndex: this.steps.length + 1,
      type,
      explanation,
      subExplanation,
      codeLine,
      array: [...this.arr],
      low,
      high,
      pivotIndex,
      pivotValue: pivotValue !== null ? pivotValue : (pivotIndex >= 0 && pivotIndex < this.n ? this.arr[pivotIndex] : null),
      i,
      j,
      activeIndices,
      comparingIndices,
      swappingIndices,
      sortedIndices: Array.from(this.sortedIndices).sort((a, b) => a - b),
      stateTag,
      activeCallId,
      comparisons: this.comparisons,
      swaps: this.swaps,
      pivotsSelected: this.pivotsSelected,
      partitionRegions: {
        smaller: smallerRegion,
        greater: greaterRegion,
        unprocessed: unprocessedRegion,
        pivot: pivotIndex >= 0 ? [pivotIndex] : []
      },
      callStack: JSON.parse(JSON.stringify(this.callStack))
    };

    this.steps.push(step);
  }

  generate() {
    this.steps = [];
    this.comparisons = 0;
    this.swaps = 0;
    this.pivotsSelected = 0;
    this.sortedIndices.clear();
    this.callIdCounter = 0;
    this.callStack = [];

    this._recordStep({
      type: "INIT",
      explanation: `Initial array loaded with ${this.n} elements: [${this.arr.join(", ")}].`,
      subExplanation: "Ready to execute Quick Sort using the Lomuto partition scheme with the last element as pivot.",
      codeLine: 1,
      stateTag: "normal"
    });

    if (this.n === 0) return this.steps;

    if (this.n === 1) {
      this.sortedIndices.add(0);
      this._recordStep({
        type: "SORT_COMPLETE",
        explanation: `Array contains single element ${this.arr[0]} which is already sorted.`,
        subExplanation: "No partitioning required for a single-element array.",
        codeLine: 2,
        low: 0,
        high: 0,
        activeIndices: [0],
        stateTag: "sorted"
      });
      return this.steps;
    }

    this._quicksort(0, this.n - 1, 0, null);

    // Final safety: mark all indices as sorted
    for (let idx = 0; idx < this.n; idx++) {
      this.sortedIndices.add(idx);
    }

    this._recordStep({
      type: "SORT_COMPLETE",
      explanation: `Array Sorted Successfully! Final array: [${this.arr.join(", ")}].`,
      subExplanation: `Quick Sort completed with ${this.comparisons} comparisons, ${this.swaps} swaps, and ${this.pivotsSelected} pivot selections.`,
      codeLine: 1,
      activeIndices: Array.from({ length: this.n }, (_, k) => k),
      stateTag: "sorted"
    });

    return this.steps;
  }

  _quicksort(low, high, depth, parentId) {
    this.callIdCounter += 1;
    const callId = this.callIdCounter;
    const frame = {
      id: callId,
      low,
      high,
      depth,
      parentId,
      label: `QUICKSORT(${low}, ${high})`,
      status: "ACTIVE"
    };
    this.callStack.push(frame);

    this._recordStep({
      type: "CALL_QUICKSORT",
      explanation: `Executing QUICKSORT(A, low=${low}, high=${high}) at recursion depth ${depth}.`,
      subExplanation: `Checking base condition: if low < high (${low} < ${high} is ${low < high}).`,
      codeLine: 2,
      low,
      high,
      activeIndices: low <= high ? Array.from({ length: high - low + 1 }, (_, k) => low + k) : [],
      stateTag: "active_subarray",
      activeCallId: callId
    });

    if (low < high) {
      const pivotIndex = this._partition(low, high, depth, callId);

      // Left subarray call
      this._recordStep({
        type: "RECURSE_LEFT_PREPARE",
        explanation: `Partition complete at index ${pivotIndex}. Preparing recursive call on LEFT subarray [${low}..${pivotIndex - 1}].`,
        subExplanation: `Elements in this subarray are all <= pivot ${this.arr[pivotIndex]}.`,
        codeLine: 4,
        low,
        high,
        pivotIndex,
        pivotValue: this.arr[pivotIndex],
        activeIndices: low <= pivotIndex - 1 ? Array.from({ length: pivotIndex - low }, (_, k) => low + k) : [],
        stateTag: "active_subarray",
        activeCallId: callId
      });
      this._quicksort(low, pivotIndex - 1, depth + 1, callId);

      // Right subarray call
      this._recordStep({
        type: "RECURSE_RIGHT_PREPARE",
        explanation: `Left partition finished. Preparing recursive call on RIGHT subarray [${pivotIndex + 1}..${high}].`,
        subExplanation: `Elements in this subarray are all > pivot ${this.arr[pivotIndex]}.`,
        codeLine: 5,
        low,
        high,
        pivotIndex,
        pivotValue: this.arr[pivotIndex],
        activeIndices: pivotIndex + 1 <= high ? Array.from({ length: high - pivotIndex }, (_, k) => pivotIndex + 1 + k) : [],
        stateTag: "active_subarray",
        activeCallId: callId
      });
      this._quicksort(pivotIndex + 1, high, depth + 1, callId);

    } else if (low === high) {
      this.sortedIndices.add(low);
      this._recordStep({
        type: "BASE_CASE_SINGLE",
        explanation: `Base case reached: Subarray [${low}..${high}] has only 1 element (${this.arr[low]}).`,
        subExplanation: "A single-element subarray is already in its final sorted position.",
        codeLine: 2,
        low,
        high,
        activeIndices: [low],
        stateTag: "sorted",
        activeCallId: callId
      });
    } else {
      this._recordStep({
        type: "BASE_CASE_EMPTY",
        explanation: `Base case reached: Subarray [${low}..${high}] is empty (low > high).`,
        subExplanation: "No elements to sort. Returning immediately.",
        codeLine: 2,
        low,
        high,
        stateTag: "normal",
        activeCallId: callId
      });
    }

    // Mark completed and pop
    const target = this.callStack.find(f => f.id === callId);
    if (target) target.status = "COMPLETED";
    this.callStack = this.callStack.filter(f => f.id !== callId);
  }

  _partition(low, high, depth, callId) {
    const pivot = this.arr[high];
    this.pivotsSelected += 1;
    const pivotIdx = high;

    let i = low - 1;
    let j = low;

    // 1. Pivot selection step
    this._recordStep({
      type: "PIVOT_SELECTED",
      explanation: `Pivot selected: ${pivot} at index ${high}. Rule: Last element of subarray [${low}..${high}].`,
      subExplanation: `Lomuto partition initializes pointer i = low - 1 = ${i} (boundary for <= pivot). Pointer j will scan from index ${low} to ${high - 1}.`,
      codeLine: 7,
      low,
      high,
      pivotIndex: pivotIdx,
      pivotValue: pivot,
      i,
      j,
      activeIndices: [high],
      stateTag: "pivot",
      activeCallId: callId
    });

    for (j = low; j < high; j++) {
      this.comparisons += 1;
      const currVal = this.arr[j];

      // 2. Comparison step
      this._recordStep({
        type: "COMPARE",
        explanation: `Comparing arr[${j}] = ${currVal} with pivot ${pivot}.`,
        subExplanation: `Testing condition: arr[${j}] <= pivot (${currVal} <= ${pivot}).`,
        codeLine: 10,
        low,
        high,
        pivotIndex: pivotIdx,
        pivotValue: pivot,
        i,
        j,
        activeIndices: [j, high],
        comparingIndices: [j, high],
        stateTag: "compare",
        activeCallId: callId
      });

      if (currVal <= pivot) {
        i += 1;
        if (i !== j) {
          this.swaps += 1;
          const valIBefore = this.arr[i];
          const valJBefore = this.arr[j];
          this.arr[i] = valJBefore;
          this.arr[j] = valIBefore;

          this._recordStep({
            type: "SWAP",
            explanation: `${valJBefore} <= ${pivot}: Increment i to ${i} and SWAP arr[${i}] (${valIBefore}) with arr[${j}] (${valJBefore}).`,
            subExplanation: `Element ${valJBefore} is moved into the smaller/equal region on the left.`,
            codeLine: 12,
            low,
            high,
            pivotIndex: pivotIdx,
            pivotValue: pivot,
            i,
            j,
            activeIndices: [i, j],
            swappingIndices: [i, j],
            stateTag: "swap",
            activeCallId: callId
          });
        } else {
          this._recordStep({
            type: "IN_PLACE_LE",
            explanation: `${currVal} <= ${pivot}: Increment i to ${i} (equals j). Element ${currVal} is already in the smaller region.`,
            subExplanation: "No swap required since i and j point to the same index.",
            codeLine: 11,
            low,
            high,
            pivotIndex: pivotIdx,
            pivotValue: pivot,
            i,
            j,
            activeIndices: [j],
            stateTag: "compare",
            activeCallId: callId
          });
        }
      } else {
        this._recordStep({
          type: "GREATER_THAN_PIVOT",
          explanation: `${currVal} > ${pivot}: Element remains in the right (greater) region.`,
          subExplanation: `Pointer i remains at ${i}. Pointer j will advance to scan the next element.`,
          codeLine: 9,
          low,
          high,
          pivotIndex: pivotIdx,
          pivotValue: pivot,
          i,
          j,
          activeIndices: [j],
          stateTag: "normal",
          activeCallId: callId
        });
      }
    }

    // 3. Scan finished
    this._recordStep({
      type: "PARTITION_END_SCAN",
      explanation: `Scanning complete for subarray [${low}..${high}]. Pointer j reached high.`,
      subExplanation: `Now placing pivot ${pivot} into its sorted position by swapping arr[${i + 1}] and arr[${high}].`,
      codeLine: 13,
      low,
      high,
      pivotIndex: pivotIdx,
      pivotValue: pivot,
      i,
      j: high,
      activeIndices: [i + 1, high],
      stateTag: "active_subarray",
      activeCallId: callId
    });

    // 4. Place pivot swap
    const finalPivotIdx = i + 1;
    if (finalPivotIdx !== high) {
      this.swaps += 1;
      const valAtIPlus1 = this.arr[finalPivotIdx];
      this.arr[finalPivotIdx] = this.arr[high];
      this.arr[high] = valAtIPlus1;

      this._recordStep({
        type: "SWAP_PIVOT",
        explanation: `Swapped arr[${finalPivotIdx}] (${valAtIPlus1}) with pivot arr[${high}] (${pivot}).`,
        subExplanation: `The pivot is now positioned between smaller elements (<= ${pivot}) and larger elements (> ${pivot}).`,
        codeLine: 13,
        low,
        high,
        pivotIndex: finalPivotIdx,
        pivotValue: pivot,
        i,
        j: high,
        activeIndices: [finalPivotIdx, high],
        swappingIndices: [finalPivotIdx, high],
        stateTag: "swap",
        activeCallId: callId
      });
    }

    this.sortedIndices.add(finalPivotIdx);

    this._recordStep({
      type: "PIVOT_PLACED",
      explanation: `Pivot ${pivot} is now FIXED in its final sorted position at index ${finalPivotIdx}.`,
      subExplanation: `Subarray partitioned into: Left [${low}..${finalPivotIdx - 1}] (all <= ${pivot}), Pivot [${finalPivotIdx}], and Right [${finalPivotIdx + 1}..${high}] (all > ${pivot}).`,
      codeLine: 14,
      low,
      high,
      pivotIndex: finalPivotIdx,
      pivotValue: pivot,
      i,
      j: high,
      activeIndices: [finalPivotIdx],
      stateTag: "sorted",
      activeCallId: callId
    });

    return finalPivotIdx;
  }
}

if (typeof window !== "undefined") {
  window.QuickSortEventGenerator = QuickSortEventGenerator;
}
