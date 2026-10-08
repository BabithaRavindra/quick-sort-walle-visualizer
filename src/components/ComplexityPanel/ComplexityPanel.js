/**
 * ComplexityPanel Component
 * Section 15: Quick Sort Time & Space Complexity Analysis
 * Concise, academic, student-friendly format for DAA evaluation.
 */

export function renderComplexityPanel() {
  return `
    <div class="complexity-panel-card">
      <div class="complexity-header">
        <div class="comp-title-wrap">
          <span class="comp-icon">⏱️</span>
          <strong>Quick Sort Complexity Analysis</strong>
        </div>
        <span class="comp-tag">DAA CIA 3(B) Theoretical Bounds</span>
      </div>

      <div class="complexity-grid">
        <!-- Best Case -->
        <div class="comp-card card-best">
          <div class="comp-card-badge">BEST CASE</div>
          <div class="comp-notation">O(n log n)</div>
          <div class="comp-desc">
            Occurs when the pivot consistently partitions the subarray into two roughly equal halves of size ≈ n/2.
          </div>
          <div class="comp-recurrence">Recurrence: T(n) = 2T(n/2) + O(n)</div>
        </div>

        <!-- Average Case -->
        <div class="comp-card card-avg">
          <div class="comp-card-badge">AVERAGE CASE</div>
          <div class="comp-notation">O(n log n)</div>
          <div class="comp-desc">
            Expected over random permutations. Even unbalanced 9-to-1 splits yield an O(n log n) recursion tree.
          </div>
          <div class="comp-recurrence">Recurrence: T(n) = T(i) + T(n-i-1) + O(n)</div>
        </div>

        <!-- Worst Case -->
        <div class="comp-card card-worst">
          <div class="comp-card-badge">WORST CASE</div>
          <div class="comp-notation">O(n²)</div>
          <div class="comp-desc">
            Occurs with Lomuto partition when the array is already sorted or reverse-sorted: the pivot is always the extreme (min/max), generating splits of size (n-1) and 0.
          </div>
          <div class="comp-recurrence">Recurrence: T(n) = T(n-1) + O(n)</div>
        </div>
      </div>

      <!-- Space Complexity -->
      <div class="space-complexity-box">
        <div class="space-header">
          <strong>💾 Auxiliary Space Complexity (Recursion Call Stack)</strong>
        </div>
        <div class="space-details">
          <div class="space-item">
            <span class="space-label">Average Recursion Depth:</span>
            <span class="space-val">O(log n)</span>
            <span class="space-note">— Balanced call tree with logarithmic stack frames</span>
          </div>
          <div class="space-item">
            <span class="space-label">Worst-Case Recursion Depth:</span>
            <span class="space-val">O(n)</span>
            <span class="space-note">— Skewed tree when partitions are repeatedly (n-1) and 0</span>
          </div>
          <div class="space-item in-place-note">
            <span class="space-label">In-Place Sorting:</span>
            <span class="space-val">Yes</span>
            <span class="space-note">— Elements are swapped directly in-place without auxiliary arrays</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
