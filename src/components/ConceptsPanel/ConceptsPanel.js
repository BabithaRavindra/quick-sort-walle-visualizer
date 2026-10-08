/**
 * ConceptsPanel Component
 * Section 17: Learning Mode ("How Quick Sort Works" 4-Stage Flow)
 * Section 24: Viva-Friendly Features (8 Key DAA Questions & Answers)
 */

export function renderLearningModal() {
  return `
    <div id="learningModal" class="modal-overlay hidden">
      <div class="modal-dialog">
        <div class="modal-header">
          <div class="modal-title-row">
            <span class="modal-icon">💡</span>
            <h3>How Quick Sort Works (4-Stage Core Flow)</h3>
          </div>
          <button id="btnCloseModal" class="btn-close-modal">✕</button>
        </div>

        <div class="modal-body">
          <div class="stages-flow-grid">
            <!-- Stage 1 -->
            <div class="stage-card">
              <div class="stage-num-badge">01</div>
              <h4>Choose Pivot</h4>
              <div class="stage-visual stage-visual-1">
                <span class="vis-box">38</span>
                <span class="vis-box">12</span>
                <span class="vis-box">27</span>
                <span class="vis-box vis-pivot-highlight">18 ★</span>
              </div>
              <p>Under the Lomuto partitioning scheme, select the <strong>last element</strong> of the current subarray as the pivot element.</p>
            </div>

            <!-- Stage 2 -->
            <div class="stage-card">
              <div class="stage-num-badge">02</div>
              <h4>Partition Subarray</h4>
              <div class="stage-visual stage-visual-2">
                <span class="vis-box vis-smaller">12</span>
                <span class="vis-box vis-smaller">9</span>
                <span class="vis-sep">|</span>
                <span class="vis-box vis-greater">38</span>
                <span class="vis-box vis-greater">43</span>
              </div>
              <p>Scan with pointer <code>j</code>. Whenever <code>arr[j] &le; pivot</code>, advance boundary pointer <code>i</code> and swap <code>arr[i]</code> with <code>arr[j]</code>.</p>
            </div>

            <!-- Stage 3 -->
            <div class="stage-card">
              <div class="stage-num-badge">03</div>
              <h4>Place Pivot</h4>
              <div class="stage-visual stage-visual-3">
                <span class="vis-box vis-smaller">≤ Pivot</span>
                <span class="vis-box vis-placed">18 ✓</span>
                <span class="vis-box vis-greater">> Pivot</span>
              </div>
              <p>Swap <code>arr[i + 1]</code> with <code>arr[high]</code>. The pivot is now placed in its <strong>permanent sorted index</strong>.</p>
            </div>

            <!-- Stage 4 -->
            <div class="stage-card">
              <div class="stage-num-badge">04</div>
              <h4>Recurse</h4>
              <div class="stage-visual stage-visual-4">
                <span class="vis-box vis-recurse">Left [0..p-1]</span>
                <span class="vis-arrow">↶ ↷</span>
                <span class="vis-box vis-recurse">Right [p+1..n-1]</span>
              </div>
              <p>Recursively call Quick Sort on the left and right subarrays until all base cases (subarrays of size &le; 1) are reached.</p>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button id="btnUnderstand" class="btn btn-primary">Got it, Let's Simulate!</button>
        </div>
      </div>
    </div>
  `;
}

export function renderVivaSection() {
  const vivaQA = [
    {
      q: "1. What is Quick Sort?",
      a: "Quick Sort is a highly efficient, comparison-based, in-place, divide-and-conquer sorting algorithm. It selects a 'pivot' element and partitions the array such that all elements smaller than or equal to the pivot come before it, and all greater elements come after it, recursively repeating this for the subarrays."
    },
    {
      q: "2. What is a pivot?",
      a: "The pivot is the reference element chosen to partition the array. In our implementation (Lomuto partition), the pivot is always chosen as the last element of the current subarray (arr[high])."
    },
    {
      q: "3. What is partitioning?",
      a: "Partitioning is the core operation of Quick Sort that rearranges elements in-place around the pivot. At the end of partitioning, the pivot is in its final sorted position, with smaller/equal elements to its left and larger elements to its right."
    },
    {
      q: "4. Why is Quick Sort a Divide-and-Conquer algorithm?",
      a: "Because it follows three classic phases: (1) Divide: Partition the array into two subarrays around the pivot; (2) Conquer: Recursively sort the two subarrays; (3) Combine: Trivial because the partitioning was done in-place, so no merging step is required."
    },
    {
      q: "5. Why is the average time complexity O(n log n)?",
      a: "On average, the pivot divides the array into roughly proportional parts (e.g. 50/50 or even 90/10). The height of the recursion tree is O(log n), and at each level of the tree, the partition step examines all n elements, yielding O(n log n)."
    },
    {
      q: "6. When does the worst case O(n²) occur?",
      a: "For the Lomuto partition with the last element as pivot, the worst case occurs when the array is already sorted in ascending or descending order. In this case, the pivot is always the maximum or minimum element, creating maximally unbalanced partitions of size (n-1) and 0, resulting in a recursion depth of n and total time O(n²)."
    },
    {
      q: "7. What is the difference between pointers i and j in Lomuto partition?",
      a: "Pointer i tracks the boundary of elements that are smaller than or equal to the pivot (initialized to low - 1). Pointer j scans through the subarray from low to high - 1. When arr[j] <= pivot, i is incremented and arr[i] is swapped with arr[j]."
    },
    {
      q: "8. Why are recursive calls required?",
      a: "Placing a pivot only guarantees that that specific pivot is in its correct final position and that the array is divided into two independent sets. The elements within the left and right subarrays are still unsorted. Recursive calls are required to sort each independent subarray until the base case (size ≤ 1) is reached."
    }
  ];

  const itemsHtml = vivaQA.map((item, idx) => `
    <details class="viva-item" ${idx === 0 ? 'open' : ''}>
      <summary class="viva-question">
        <span class="viva-q-text"><strong>${item.q}</strong></span>
        <span class="viva-toggle-icon">▼</span>
      </summary>
      <div class="viva-answer">
        <p>${item.a}</p>
      </div>
    </details>
  `).join("");

  return `
    <div class="viva-panel-card">
      <div class="viva-header">
        <div class="viva-title-wrap">
          <span class="viva-icon">📜</span>
          <strong>Axiom Central Archives: Viva Examination Protocols</strong>
        </div>
        <span class="viva-tag">DAA Oral Exam Key Questions</span>
      </div>
      <div class="viva-accordion">
        ${itemsHtml}
      </div>
    </div>
  `;
}
