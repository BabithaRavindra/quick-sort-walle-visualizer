/**
 * AlgorithmPanel Component
 * Section 16: Quick Sort Algorithm Pseudocode
 * Features synchronized active line highlighting matching the current step execution!
 */

export function renderAlgorithmPanel(activeLine = 1) {
  const codeLines = [
    { num: 1, text: "QUICKSORT(A, low, high)" },
    { num: 2, text: "    if low < high" },
    { num: 3, text: "        p = PARTITION(A, low, high)" },
    { num: 4, text: "        QUICKSORT(A, low, p - 1)" },
    { num: 5, text: "        QUICKSORT(A, p + 1, high)" },
    { num: 6, text: "" },
    { num: 7, text: "PARTITION(A, low, high)" },
    { num: 8, text: "    pivot = A[high]" },
    { num: 9, text: "    i = low - 1" },
    { num: 10, text: "    for j = low to high - 1" },
    { num: 11, text: "        if A[j] <= pivot" },
    { num: 12, text: "            i = i + 1" },
    { num: 13, text: "            swap A[i] and A[j]" },
    { num: 14, text: "    swap A[i + 1] and A[high]" },
    { num: 15, text: "    return i + 1" }
  ];

  const linesHtml = codeLines.map(line => {
    if (!line.text) {
      return '<div class="code-line empty-line"></div>';
    }
    const isActive = line.num === activeLine;
    return `
      <div class="code-line ${isActive ? 'line-active' : ''}">
        <span class="line-num">${line.num < 10 ? ' ' + line.num : line.num}</span>
        <span class="line-text">${line.text}</span>
        ${isActive ? '<span class="line-indicator">◀ EXECUTING</span>' : ''}
      </div>
    `;
  }).join("");

  return `
    <div class="algorithm-panel-card">
      <div class="algorithm-header">
        <div class="alg-title-wrap">
          <span class="alg-icon">📜</span>
          <strong>Quick Sort Algorithm (Lomuto Scheme)</strong>
        </div>
        <span class="badge-sync">Live Trace Synchronized</span>
      </div>
      <div class="code-block">
        <pre><code>${linesHtml}</code></pre>
      </div>
    </div>
  `;
}
