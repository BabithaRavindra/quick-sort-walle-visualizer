# DAA CIA 3(B) — Interactive Quick Sort Simulator
### Topic: Quick Sort using Pivot Selection and Partitioning (Lomuto Partition Scheme)

---

## 📖 Project Overview

This project is an **interactive educational web simulator** developed for the **Design and Analysis of Algorithms (DAA) CIA 3(B)** assignment. 

Rather than merely displaying a sorted array, this simulator visually demonstrates and explains the **exact internal mechanics of Quick Sort**:
1. **Initial Unsorted Array**
2. **Pivot Selection** (Last element of current subarray: `A[high]`)
3. **Partition Process** (Scanning with pointer `j`, maintaining boundary pointer `i`)
4. **Comparison** (`arr[j] <= pivot`)
5. **Swapping** (`swap(arr[i], arr[j])`)
6. **Final Placement of Pivot** (`swap(arr[i + 1], arr[high])`)
7. **Creation of Left and Right Subarrays**
8. **Recursive Divide-and-Conquer Calls**
9. **Repetition for Subarrays**
10. **Final Sorted Array**

---

## 🎨 Visual Design & Palette

Built with a clean academic design matching the assignment palette:
- **`#E5F5E0`**: Light Mint — Active subarray background & smaller region chips
- **`#A1D99B`**: Medium Green — Active borders & secondary highlights
- **`#31A354`**: Forest Green — Final sorted / placed elements & primary brand
- **Accent Gold (`#D97706` / `#FEF3C7`)**: Current Pivot Element
- **Accent Blue (`#2563EB` / `#DBEAFE`)**: Current Comparison Element
- **Accent Red (`#DC2626` / `#FEE2E2`)**: Active Swapping Elements

---

## 🚀 How to Run Locally

### Prerequisites
- Python 3.9+ installed
- Streamlit installed (`pip install streamlit`)

### Standard Run Command
```bash
# Navigate to project directory
cd "C:\Users\Babitha Ravindra\.gemini\antigravity\scratch\quick-sort-simulator"

# Run with Streamlit
streamlit run app.py
```

Alternatively, you can also run:
```bash
streamlit run src/main.py
```
or
```bash
streamlit run src/App.py
```

The application will launch in your browser at `http://localhost:8501`.

---

## 🧪 Verification & Test Cases

The algorithm has been verified using automated unit tests against all required assignment scenarios:
1. **Standard Array:** `[38, 12, 27, 43, 9, 31, 18]` → `[9, 12, 18, 27, 31, 38, 43]`
2. **Reverse Sorted (Worst Case):** `[5, 4, 3, 2, 1]` → `[1, 2, 3, 4, 5]`
3. **Already Sorted (Worst Case):** `[1, 2, 3, 4, 5]` → `[1, 2, 3, 4, 5]`
4. **Duplicates:** `[5, 5, 3, 8, 5, 2]` → `[2, 3, 5, 5, 5, 8]`
5. **Single Element (Base Case):** `[42]` → `[42]`

Run tests anytime with:
```bash
python tests/test_quick_sort.py
```

---

## 📁 Project Structure

```text
quick-sort-simulator/
├── app.py                     # Root entry point for Streamlit
├── requirements.txt           # Python dependencies
├── README.md                  # Project documentation & viva guide
├── tests/
│   └── test_quick_sort.py     # Automated test suite for all 5 test cases
└── src/
    ├── components/
    │   ├── ArrayVisualizer/   # Bars, indices, pointers, partition regions
    │   ├── Controls/          # Inputs, step buttons, speed, scrubber
    │   ├── ExplanationPanel/  # "What's happening?" dynamic explanation
    │   ├── ComplexityPanel/   # Best, Average, Worst case analysis
    │   ├── RecursiveTree/     # Call stack frames & subarray division
    │   ├── AlgorithmPanel/    # Pseudocode with live line highlighting
    │   └── ConceptsPanel/     # 4-stage learning mode & viva Q&A
    ├── algorithms/
    │   ├── quickSort.js       # Lomuto partition event generator (JS)
    │   └── quick_sort.py      # Lomuto partition event generator (Python)
    ├── data/
    │   └── examples.js        # Standard preset arrays
    ├── App.py                 # Streamlit UI & component bundler
    ├── App.css                # Academic CSS stylesheet
    └── main.py                # Source entry point
```

---

## 💡 Viva Presentation Highlights

### 1. What happens during Lomuto Partitioning?
- Pivot is fixed at `arr[high]`.
- Boundary pointer `i` begins at `low - 1`.
- Scanner pointer `j` iterates from `low` to `high - 1`.
- If `arr[j] <= pivot`, increment `i` and swap `arr[i]` with `arr[j]`.
- When `j` reaches `high`, swap `arr[i + 1]` with `arr[high]`.
- Return `i + 1` as the final sorted pivot position.

### 2. Time & Space Complexity
| Case | Time Complexity | Condition |
| :--- | :---: | :--- |
| **Best Case** | $\mathcal{O}(n \log n)$ | Pivot splits array into balanced halves |
| **Average Case** | $\mathcal{O}(n \log n)$ | Expected over random inputs |
| **Worst Case** | $\mathcal{O}(n^2)$ | Already sorted or reverse-sorted array with Lomuto |
| **Space Complexity** | $\mathcal{O}(\log n)$ avg, $\mathcal{O}(n)$ worst | Auxiliary recursion call stack depth |

### 3. Keyboard Shortcuts in Simulator
- `Space`: Play / Pause
- `→` or `L`: Next Step
- `←` or `H`: Previous Step
- `R`: Reset to Step 1
