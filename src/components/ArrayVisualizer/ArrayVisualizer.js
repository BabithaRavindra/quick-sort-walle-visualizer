/**
 * ArrayVisualizer Component — WALL•E Compactor & EVE Optical Scanner
 * Responsible for rendering:
 * 1. Proportional vertical bars styled as compacted scrap blocks
 * 2. Visual states: Normal, EVE Scan (Compare), Compactor Shift (Swap), Directive (Pivot), Plant in Boot (Sorted)
 * 3. Pointers i (WALL•E Compactor Arm) and j (EVE Optical Sensor) with indicator arrows
 * 4. Partition Regions breakdown: Salvage <= Directive | Unscanned | Salvage > Directive | Directive
 */

export function renderArrayVisualizer(step, initialArray) {
  if (!step) return '<div class="empty-state">No scrap pile loaded.</div>';

  const {
    array,
    low,
    high,
    pivotIndex,
    pivotValue,
    i,
    j,
    activeIndices = [],
    comparingIndices = [],
    swappingIndices = [],
    sortedIndices = [],
    partitionRegions = { smaller: [], greater: [], unprocessed: [], pivot: [] }
  } = step;

  const maxVal = Math.max(...array, 1);
  const minVal = Math.min(...array, 0);
  const valRange = Math.max(maxVal - minVal, 1);

  // Region Chips calculation
  const smallerVals = (partitionRegions.smaller || []).map(idx => array[idx]);
  const greaterVals = (partitionRegions.greater || []).map(idx => array[idx]);
  const unprocessedVals = (partitionRegions.unprocessed || []).map(idx => array[idx]);

  const hasActivePartition = low >= 0 && high >= 0 && low < high;

  // Build Partition Region Bar (Section 9 Requirement — WALL-E Themed)
  let partitionBarHtml = "";
  if (hasActivePartition) {
    partitionBarHtml = `
      <div class="partition-summary-container">
        <div class="partition-section-label">⚙️ COMPACTOR PARTITION SECTORS (Subarray [${low}..${high}])</div>
        <div class="partition-bar-grid">
          <div class="region-box region-smaller">
            <div class="region-title">
              <span class="region-dot dot-smaller"></span> Salvage ≤ Directive (${smallerVals.length})
            </div>
            <div class="region-chips">
              ${smallerVals.length > 0
                ? smallerVals.map(v => `<span class="chip chip-smaller">${v}</span>`).join("")
                : '<span class="chip-empty">None yet</span>'
              }
            </div>
            <div class="region-subtext">Compactor range: low(${low}) to i(${i})</div>
          </div>

          <div class="region-box region-greater">
            <div class="region-title">
              <span class="region-dot dot-greater"></span> Salvage > Directive (${greaterVals.length})
            </div>
            <div class="region-chips">
              ${greaterVals.length > 0
                ? greaterVals.map(v => `<span class="chip chip-greater">${v}</span>`).join("")
                : '<span class="chip-empty">None yet</span>'
              }
            </div>
            <div class="region-subtext">Scanned larger debris</div>
          </div>

          <div class="region-box region-unprocessed">
            <div class="region-title">
              <span class="region-dot dot-unprocessed"></span> Unscanned Waste (${unprocessedVals.length})
            </div>
            <div class="region-chips">
              ${unprocessedVals.length > 0
                ? unprocessedVals.map(v => `<span class="chip chip-unprocessed">${v}</span>`).join("")
                : '<span class="chip-empty">All scanned</span>'
              }
            </div>
            <div class="region-subtext">EVE scanning j(${j}) to high-1</div>
          </div>

          <div class="region-box region-pivot">
            <div class="region-title">
              <span class="region-dot dot-pivot"></span> Primary Directive (Pivot)
            </div>
            <div class="region-chips">
              <span class="chip chip-pivot">★ ${pivotValue !== null ? pivotValue : "None"} (idx ${high})</span>
            </div>
            <div class="region-subtext">Lomuto Rule: Last element</div>
          </div>
        </div>
      </div>
    `;
  }

  // Build Array Element Bars — Compacted Scrap Blocks
  const barsHtml = array.map((val, idx) => {
    // Determine status
    const isSorted = sortedIndices.includes(idx);
    const isPivot = idx === pivotIndex;
    const isComparing = comparingIndices.includes(idx);
    const isSwapping = swappingIndices.includes(idx);
    const inActiveSubarray = low >= 0 && high >= 0 && idx >= low && idx <= high;

    let stateClass = "state-normal";
    let stateLabel = "";

    if (isSorted) {
      stateClass = "state-sorted";
      stateLabel = "🌱 SORTED";
    } else if (isSwapping) {
      stateClass = "state-swap";
      stateLabel = "COMPACT ⇄";
    } else if (isComparing) {
      stateClass = "state-compare";
      stateLabel = "EVE SCAN";
    } else if (isPivot) {
      stateClass = "state-pivot";
      stateLabel = "★ DIRECTIVE";
    } else if (inActiveSubarray) {
      stateClass = "state-active-subarray";
    }

    // Height calculation (min 45px, max 195px)
    const normalizedHeight = Math.max(40, Math.min(195, Math.round(((val - minVal) / valRange) * 145 + 45)));

    // Pointer badges for this index
    const isPointerI = idx === i;
    const isPointerJ = idx === j;

    let pointerHtml = "";
    if (isPointerI && isPointerJ) {
      pointerHtml = `
        <div class="pointer-wrapper">
          <div class="pointer-arrow double">▲</div>
          <div class="pointer-badge badge-both">WALL•E & EVE = ${idx}</div>
        </div>
      `;
    } else if (isPointerI) {
      pointerHtml = `
        <div class="pointer-wrapper">
          <div class="pointer-arrow pointer-arrow-i">▲</div>
          <div class="pointer-badge badge-i">i = ${idx} (WALL•E)</div>
        </div>
      `;
    } else if (isPointerJ) {
      pointerHtml = `
        <div class="pointer-wrapper">
          <div class="pointer-arrow pointer-arrow-j">▲</div>
          <div class="pointer-badge badge-j">j = ${idx} (EVE)</div>
        </div>
      `;
    }

    return `
      <div class="bar-column ${inActiveSubarray ? 'in-subarray' : 'out-subarray'}" data-index="${idx}">
        <div class="bar-card ${stateClass}">
          ${stateLabel ? `<div class="bar-badge">${stateLabel}</div>` : '<div class="bar-badge badge-placeholder"></div>'}
          <div class="bar-visual" style="height: ${normalizedHeight}px;">
            <span class="bar-value">${val}</span>
          </div>
          <div class="bar-index-tag">
            <span class="index-label">i=${idx}</span>
          </div>
        </div>
        <div class="pointer-slot">
          ${pointerHtml}
        </div>
      </div>
    `;
  }).join("");

  // Subarray range bracket
  let rangeBracketHtml = "";
  if (hasActivePartition) {
    rangeBracketHtml = `
      <div class="range-bracket-info">
        <span class="badge-range-tag">Active Scrap Sector: [Index ${low} → Index ${high}]</span>
        <span class="badge-pointer-info">i = ${i} (WALL•E boundary ≤ Directive) | j = ${j} (EVE scan) | Directive = ${pivotValue}</span>
      </div>
    `;
  }

  // Pointer indicator when i = low - 1 (outside active range to the left)
  let preArrayPointerHtml = "";
  if (low >= 0 && i === low - 1) {
    preArrayPointerHtml = `
      <div class="pre-array-pointer">
        <div class="pointer-wrapper">
          <div class="pointer-arrow pointer-arrow-i">▲</div>
          <div class="pointer-badge badge-i">i = ${i} (low-1)</div>
          <div class="pointer-desc">Compactor empty (no scrap ≤ Directive yet)</div>
        </div>
      </div>
    `;
  }

  return `
    <div class="array-visualizer-component">
      ${partitionBarHtml}
      ${rangeBracketHtml}
      <div class="array-stage-container">
        ${preArrayPointerHtml}
        <div class="array-bars-row">
          ${barsHtml}
        </div>
      </div>
    </div>
  `;
}
