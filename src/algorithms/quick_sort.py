"""
Quick Sort using Lomuto Partition Scheme with Step-by-Step Visualization Event Generator.
Designed for DAA (Design and Analysis of Algorithms) CIA 3(B).

Algorithm Specification:
- Lomuto Partition Scheme
- Pivot Selection: Last element of the current subarray (arr[high])
- Pointer i: Boundary of elements <= pivot (initialized to low - 1)
- Pointer j: Scans from low to high - 1
- Swaps arr[i] and arr[j] whenever arr[j] <= pivot
- Final swap: arr[i + 1] and arr[high] to place the pivot in its correct sorted position
- Recursively sorts left subarray (low to pivotIndex - 1) and right subarray (pivotIndex + 1 to high)
"""

from typing import List, Dict, Any, Set
import copy


class QuickSortEventGenerator:
    """
    Executes Quick Sort with Lomuto partitioning and records an exhaustive
    trace of algorithm events with full state snapshots.
    """

    def __init__(self, initial_array: List[int]):
        self.initial_array = list(initial_array)
        self.arr = list(initial_array)
        self.n = len(self.arr)
        self.steps: List[Dict[str, Any]] = []
        self.comparisons = 0
        self.swaps = 0
        self.pivots_selected = 0
        self.sorted_indices: Set[int] = set()
        self.call_id_counter = 0
        self.call_stack: List[Dict[str, Any]] = []
        self.call_tree_nodes: List[Dict[str, Any]] = []

    def _record_step(
        self,
        event_type: str,
        explanation: str,
        sub_explanation: str,
        code_line: int,
        low: int = -1,
        high: int = -1,
        pivot_idx: int = -1,
        pivot_val: Any = None,
        i: int = -1,
        j: int = -1,
        active_indices: List[int] = None,
        comparing_indices: List[int] = None,
        swapping_indices: List[int] = None,
        state_tag: str = "normal",
        active_call_id: int = -1,
    ):
        active_indices = active_indices or []
        comparing_indices = comparing_indices or []
        swapping_indices = swapping_indices or []

        # Calculate partition regions for visualization (Section 9)
        # Elements <= pivot | Unprocessed | Greater | Pivot
        smaller_region = []
        greater_region = []
        unprocessed_region = []

        if low >= 0 and high >= 0 and pivot_idx >= 0:
            if i >= low:
                smaller_region = list(range(low, min(i + 1, high)))
            if i + 1 <= j - 1:
                greater_region = list(range(i + 1, min(j, high)))
            if j <= high - 1:
                unprocessed_region = list(range(max(j, low), high))

        step = {
            "stepIndex": len(self.steps) + 1,
            "type": event_type,
            "explanation": explanation,
            "subExplanation": sub_explanation,
            "codeLine": code_line,
            "array": list(self.arr),
            "low": low,
            "high": high,
            "pivotIndex": pivot_idx,
            "pivotValue": pivot_val if pivot_val is not None else (self.arr[pivot_idx] if 0 <= pivot_idx < self.n else None),
            "i": i,
            "j": j,
            "activeIndices": active_indices,
            "comparingIndices": comparing_indices,
            "swappingIndices": swapping_indices,
            "sortedIndices": sorted(list(self.sorted_indices)),
            "stateTag": state_tag,
            "activeCallId": active_call_id,
            "comparisons": self.comparisons,
            "swaps": self.swaps,
            "pivotsSelected": self.pivots_selected,
            "partitionRegions": {
                "smaller": smaller_region,
                "greater": greater_region,
                "unprocessed": unprocessed_region,
                "pivot": [pivot_idx] if pivot_idx >= 0 else [],
            },
            "callStack": copy.deepcopy(self.call_stack),
        }
        self.steps.append(step)

    def generate(self) -> List[Dict[str, Any]]:
        self.steps = []
        self.comparisons = 0
        self.swaps = 0
        self.pivots_selected = 0
        self.sorted_indices = set()
        self.call_id_counter = 0
        self.call_stack = []

        # Initial state step
        self._record_step(
            event_type="INIT",
            explanation=f"Initial array loaded with {self.n} elements: {self.arr}.",
            sub_explanation="Ready to begin Quick Sort using the Lomuto partition scheme with the last element as pivot.",
            code_line=1,
            state_tag="normal",
        )

        if self.n == 0:
            return self.steps

        if self.n == 1:
            self.sorted_indices.add(0)
            self._record_step(
                event_type="SORT_COMPLETE",
                explanation=f"Array contains a single element {self.arr[0]} which is already sorted.",
                sub_explanation="No partitioning required for a single-element array.",
                code_line=2,
                low=0,
                high=0,
                state_tag="sorted",
            )
            return self.steps

        # Start recursive quicksort
        self._quicksort(0, self.n - 1, depth=0, parent_id=None)

        # Mark any remaining elements as sorted
        for idx in range(self.n):
            self.sorted_indices.add(idx)

        # Final completion step
        self._record_step(
            event_type="SORT_COMPLETE",
            explanation=f"Array Sorted Successfully! Final array: {self.arr}.",
            sub_explanation=(
                f"Quick Sort complete with {self.comparisons} comparisons, "
                f"{self.swaps} swaps, and {self.pivots_selected} pivot selections."
            ),
            code_line=1,
            active_indices=list(range(self.n)),
            state_tag="sorted",
        )

        return self.steps

    def _quicksort(self, low: int, high: int, depth: int, parent_id: Any) -> None:
        self.call_id_counter += 1
        call_id = self.call_id_counter
        frame_info = {
            "id": call_id,
            "low": low,
            "high": high,
            "depth": depth,
            "parentId": parent_id,
            "label": f"QUICKSORT({low}, {high})",
            "status": "ACTIVE",
        }
        self.call_stack.append(frame_info)

        # Record call entry
        self._record_step(
            event_type="CALL_QUICKSORT",
            explanation=f"Executing QUICKSORT(A, low={low}, high={high}) at recursion depth {depth}.",
            sub_explanation=f"Checking base condition: if low < high ({low} < {high} is {low < high}).",
            code_line=2,
            low=low,
            high=high,
            active_indices=list(range(low, high + 1)) if low <= high else [],
            state_tag="active_subarray",
            active_call_id=call_id,
        )

        if low < high:
            # Partitioning
            pivot_index = self._partition(low, high, depth, call_id)

            # Left subarray recursive call
            self._record_step(
                event_type="RECURSE_LEFT_PREPARE",
                explanation=f"Partition complete at index {pivot_index}. Preparing recursive call on LEFT subarray [{low}..{pivot_index - 1}].",
                sub_explanation=f"Elements in this subarray are all <= pivot {self.arr[pivot_index]}.",
                code_line=4,
                low=low,
                high=high,
                pivot_idx=pivot_index,
                pivot_val=self.arr[pivot_index],
                active_indices=list(range(low, pivot_index)) if low <= pivot_index - 1 else [],
                state_tag="active_subarray",
                active_call_id=call_id,
            )
            self._quicksort(low, pivot_index - 1, depth + 1, call_id)

            # Right subarray recursive call
            self._record_step(
                event_type="RECURSE_RIGHT_PREPARE",
                explanation=f"Left partition finished. Preparing recursive call on RIGHT subarray [{pivot_index + 1}..{high}].",
                sub_explanation=f"Elements in this subarray are all > pivot {self.arr[pivot_index]}.",
                code_line=5,
                low=low,
                high=high,
                pivot_idx=pivot_index,
                pivot_val=self.arr[pivot_index],
                active_indices=list(range(pivot_index + 1, high + 1)) if pivot_index + 1 <= high else [],
                state_tag="active_subarray",
                active_call_id=call_id,
            )
            self._quicksort(pivot_index + 1, high, depth + 1, call_id)

        elif low == high:
            # Single element base case
            self.sorted_indices.add(low)
            self._record_step(
                event_type="BASE_CASE_SINGLE",
                explanation=f"Base case reached: Subarray [{low}..{high}] has only 1 element ({self.arr[low]}).",
                sub_explanation="A single-element subarray is already sorted by definition.",
                code_line=2,
                low=low,
                high=high,
                active_indices=[low],
                state_tag="sorted",
                active_call_id=call_id,
            )
        else:
            # Empty subarray base case (low > high)
            self._record_step(
                event_type="BASE_CASE_EMPTY",
                explanation=f"Base case reached: Subarray [{low}..{high}] is empty (low > high).",
                sub_explanation="No elements to sort. Returning immediately.",
                code_line=2,
                low=low,
                high=high,
                state_tag="normal",
                active_call_id=call_id,
            )

        # Pop from call stack
        for frame in self.call_stack:
            if frame["id"] == call_id:
                frame["status"] = "COMPLETED"
        self.call_stack = [f for f in self.call_stack if f["id"] != call_id]

    def _partition(self, low: int, high: int, depth: int, call_id: int) -> int:
        pivot = self.arr[high]
        self.pivots_selected += 1
        pivot_idx = high

        i = low - 1
        j = low

        # Step 1: Pivot Selected
        self._record_step(
            event_type="PIVOT_SELECTED",
            explanation=f"Pivot selected: {pivot} at index {high}. Rule: Last element of subarray [{low}..{high}].",
            sub_explanation=(
                f"Lomuto partition initializes pointer i = low - 1 = {i} (boundary of elements <= pivot). "
                f"Pointer j will scan from index {low} to {high - 1}."
            ),
            code_line=7,
            low=low,
            high=high,
            pivot_idx=pivot_idx,
            pivot_val=pivot,
            i=i,
            j=j,
            active_indices=[high],
            state_tag="pivot",
            active_call_id=call_id,
        )

        for j in range(low, high):
            self.comparisons += 1
            curr_val = self.arr[j]

            # Step 2: Compare arr[j] with pivot
            self._record_step(
                event_type="COMPARE",
                explanation=f"Comparing arr[{j}] = {curr_val} with pivot {pivot}.",
                sub_explanation=f"Testing condition: arr[{j}] <= pivot ({curr_val} <= {pivot}).",
                code_line=10,
                low=low,
                high=high,
                pivot_idx=pivot_idx,
                pivot_val=pivot,
                i=i,
                j=j,
                active_indices=[j, high],
                comparing_indices=[j, high],
                state_tag="compare",
                active_call_id=call_id,
            )

            if curr_val <= pivot:
                i += 1
                if i != j:
                    # Need swap
                    self.swaps += 1
                    val_i_before = self.arr[i]
                    val_j_before = self.arr[j]
                    self.arr[i], self.arr[j] = self.arr[j], self.arr[i]

                    self._record_step(
                        event_type="SWAP",
                        explanation=f"{val_j_before} <= {pivot}: Increment i to {i} and SWAP arr[{i}] ({val_i_before}) with arr[{j}] ({val_j_before}).",
                        sub_explanation=f"Element {val_j_before} is now moved into the smaller/equal region at index {i}.",
                        code_line=12,
                        low=low,
                        high=high,
                        pivot_idx=pivot_idx,
                        pivot_val=pivot,
                        i=i,
                        j=j,
                        active_indices=[i, j],
                        swapping_indices=[i, j],
                        state_tag="swap",
                        active_call_id=call_id,
                    )
                else:
                    # i == j, element already in place
                    self._record_step(
                        event_type="IN_PLACE_LE",
                        explanation=f"{curr_val} <= {pivot}: Increment i to {i} (equals j). Element {curr_val} is already in the smaller region.",
                        sub_explanation="No swap required since i and j point to the same index.",
                        code_line=11,
                        low=low,
                        high=high,
                        pivot_idx=pivot_idx,
                        pivot_val=pivot,
                        i=i,
                        j=j,
                        active_indices=[j],
                        state_tag="compare",
                        active_call_id=call_id,
                    )
            else:
                # Element > pivot
                self._record_step(
                    event_type="GREATER_THAN_PIVOT",
                    explanation=f"{curr_val} > {pivot}: Element remains on the right side of partition.",
                    sub_explanation=f"Pointer i remains at {i}. Pointer j will advance to scan the next element.",
                    code_line=9,
                    low=low,
                    high=high,
                    pivot_idx=pivot_idx,
                    pivot_val=pivot,
                    i=i,
                    j=j,
                    active_indices=[j],
                    state_tag="normal",
                    active_call_id=call_id,
                )

        # Loop finished: now place the pivot
        self._record_step(
            event_type="PARTITION_END_SCAN",
            explanation=f"Scanning complete for subarray [{low}..{high}]. Pointer j reached high.",
            sub_explanation=f"Now placing pivot {pivot} in its final sorted position by swapping arr[{i + 1}] and arr[{high}].",
            code_line=13,
            low=low,
            high=high,
            pivot_idx=pivot_idx,
            pivot_val=pivot,
            i=i,
            j=high,
            active_indices=[i + 1, high],
            state_tag="active_subarray",
            active_call_id=call_id,
        )

        # Final placement swap
        final_pivot_idx = i + 1
        if final_pivot_idx != high:
            self.swaps += 1
            val_at_i_plus_1 = self.arr[final_pivot_idx]
            self.arr[final_pivot_idx], self.arr[high] = self.arr[high], self.arr[final_pivot_idx]

            self._record_step(
                event_type="SWAP_PIVOT",
                explanation=f"Swapped arr[{final_pivot_idx}] ({val_at_i_plus_1}) with pivot arr[{high}] ({pivot}).",
                sub_explanation=f"The pivot is placed between smaller elements (<= {pivot}) and larger elements (> {pivot}).",
                code_line=13,
                low=low,
                high=high,
                pivot_idx=final_pivot_idx,
                pivot_val=pivot,
                i=i,
                j=high,
                active_indices=[final_pivot_idx, high],
                swapping_indices=[final_pivot_idx, high],
                state_tag="swap",
                active_call_id=call_id,
            )

        # Mark pivot as sorted
        self.sorted_indices.add(final_pivot_idx)

        self._record_step(
            event_type="PIVOT_PLACED",
            explanation=f"Pivot {pivot} is now FIXED in its final sorted position at index {final_pivot_idx}.",
            sub_explanation=(
                f"Subarray partitioned into: Left [{low}..{final_pivot_idx - 1}] (all <= {pivot}), "
                f"Pivot at [{final_pivot_idx}], and Right [{final_pivot_idx + 1}..{high}] (all > {pivot})."
            ),
            code_line=14,
            low=low,
            high=high,
            pivot_idx=final_pivot_idx,
            pivot_val=pivot,
            i=i,
            j=high,
            active_indices=[final_pivot_idx],
            state_tag="sorted",
            active_call_id=call_id,
        )

        return final_pivot_idx
