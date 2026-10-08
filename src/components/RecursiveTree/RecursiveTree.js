/**
 * RecursiveTree Component — Axiom Recursive Stack & Divide-and-Conquer Sectors
 * Section 11: Recursive Subarray Visualization (Left | Directive | Right)
 * Section 12: Recursion / Call Stack Panel with visual tree and active call highlights
 */

export function renderRecursiveTree(step, allSteps, currentStepIndex) {
  if (!step) {
    return `<div class="tree-empty">No active recursive stack.</div>`;
  }

  const {
    array,
    low,
    high,
    pivotIndex,
    pivotValue,
    callStack = [],
    activeCallId
  } = step;

  // Build Subarray Division Visualizer (Section 11)
  let subarrayDivisionHtml = "";
  if (pivotIndex >= 0 && low >= 0 && high >= 0 && low < high) {
    const leftSlice = array.slice(low, pivotIndex);
    const pivotVal = array[pivotIndex];
    const rightSlice = array.slice(pivotIndex + 1, high + 1);

    subarrayDivisionHtml = `
      <div class="subarray-division-card">
        <div class="division-title">
          <span>Divide & Conquer Scrap Sectors</span>
        </div>
        <div class="division-boxes-row">
          <div class="div-box div-left">
            <div class="div-header">LEFT SECTOR</div>
            <div class="div-range">Indices [${low} .. ${pivotIndex - 1}]</div>
            <div class="div-content">
              ${leftSlice.length > 0 
                ? leftSlice.map(v => `<span class="div-num">${v}</span>`).join(" ")
                : '<span class="div-none">Empty (no smaller scrap)</span>'
              }
            </div>
            <div class="div-footer">All scrap ≤ ${pivotVal}</div>
          </div>

          <div class="div-box div-pivot">
            <div class="div-header">DIRECTIVE (FIXED 🌱)</div>
            <div class="div-range">Index [${pivotIndex}]</div>
            <div class="div-content">
              <span class="div-num pivot-focus">${pivotVal}</span>
            </div>
            <div class="div-footer">Correct Sorted Position</div>
          </div>

          <div class="div-box div-right">
            <div class="div-header">RIGHT SECTOR</div>
            <div class="div-range">Indices [${pivotIndex + 1} .. ${high}]</div>
            <div class="div-content">
              ${rightSlice.length > 0 
                ? rightSlice.map(v => `<span class="div-num">${v}</span>`).join(" ")
                : '<span class="div-none">Empty (no larger scrap)</span>'
              }
            </div>
            <div class="div-footer">All scrap > ${pivotVal}</div>
          </div>
        </div>
      </div>
    `;
  }

  // Active call stack list
  const activeStackHtml = (callStack && callStack.length > 0) ? callStack.map((frame, idx) => {
    const isActive = frame.id === activeCallId;
    return `
      <div class="stack-frame ${isActive ? 'frame-active' : 'frame-parent'}">
        <span class="frame-depth">Depth ${frame.depth}</span>
        <span class="frame-name">${frame.label}</span>
        <span class="frame-badge ${isActive ? 'badge-running' : 'badge-waiting'}">
          ${isActive ? '● COMPACTING' : 'WAITING'}
        </span>
      </div>
    `;
  }).join("") : `
    <div class="stack-frame frame-active">
      <span class="frame-depth">Depth 0</span>
      <span class="frame-name">QUICKSORT(0, ${array.length - 1})</span>
      <span class="frame-badge badge-running">● COMPLETE</span>
    </div>
  `;

  return `
    <div class="recursion-panel-card">
      <div class="panel-section-title">
        <span class="panel-icon">🌲</span>
        <strong>Axiom Recursive Call Stack</strong>
        <span class="stack-count">(${callStack.length} active sector frame${callStack.length === 1 ? '' : 's'})</span>
      </div>
      <div class="stack-frames-list">
        ${activeStackHtml}
      </div>
      ${subarrayDivisionHtml}
    </div>
  `;
}
