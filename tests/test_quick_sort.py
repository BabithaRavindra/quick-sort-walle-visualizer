"""
Unit tests for QuickSortEventGenerator covering all 5 test cases required by DAA CIA 3(B):
1. [38, 12, 27, 43, 9, 31, 18] (Custom/Standard case)
2. [5, 4, 3, 2, 1] (Reverse-sorted worst case)
3. [1, 2, 3, 4, 5] (Already sorted worst case)
4. [5, 5, 3, 8, 5, 2] (Duplicates case)
5. [42] (Single-element base case)
"""

import sys
import os

# Add src to python path
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(current_dir)
sys.path.insert(0, os.path.join(project_root, "src"))

from algorithms.quick_sort import QuickSortEventGenerator


def run_tests():
    test_cases = [
        ("Test 1: Standard Array", [38, 12, 27, 43, 9, 31, 18], [9, 12, 18, 27, 31, 38, 43]),
        ("Test 2: Reverse Sorted", [5, 4, 3, 2, 1], [1, 2, 3, 4, 5]),
        ("Test 3: Already Sorted", [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]),
        ("Test 4: Array with Duplicates", [5, 5, 3, 8, 5, 2], [2, 3, 5, 5, 5, 8]),
        ("Test 5: Single Element", [42], [42]),
    ]

    all_passed = True

    print("=" * 60)
    print("RUNNING DAA CIA 3(B) QUICK SORT VERIFICATION TESTS")
    print("=" * 60)

    for name, input_arr, expected_sorted in test_cases:
        print(f"\nRunning {name}...")
        print(f"Input: {input_arr}")

        generator = QuickSortEventGenerator(input_arr)
        steps = generator.generate()

        assert len(steps) > 0, "No steps generated!"

        final_step = steps[-1]
        final_arr = final_step["array"]

        print(f"Steps generated: {len(steps)}")
        print(f"Total Comparisons: {final_step['comparisons']}")
        print(f"Total Swaps: {final_step['swaps']}")
        print(f"Total Pivots Selected: {final_step['pivotsSelected']}")
        print(f"Final Output: {final_arr}")

        if final_arr == expected_sorted:
            print(f"PASSED: Array is correctly sorted!")
        else:
            print(f"FAILED: Expected {expected_sorted} but got {final_arr}")
            all_passed = False

        # Additional assertions
        # Check every step has required fields
        for idx, step in enumerate(steps):
            assert "stepIndex" in step
            assert "type" in step
            assert "explanation" in step
            assert "array" in step
            assert "partitionRegions" in step
            assert len(step["array"]) == len(input_arr)

    print("\n" + "=" * 60)
    if all_passed:
        print("ALL 5 REQUIRED DAA TEST CASES PASSED SUCCESSFULLY!")
    else:
        print("SOME TESTS FAILED!")
    print("=" * 60)

    return all_passed


if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
