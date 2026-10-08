/**
 * ExplanationPanel Component — WALL•E Operational Telemetry
 * Section 8: "What's happening?"
 * Dynamically explains the current operation in simple, student-friendly, academic language
 * while maintaining the thematic WALL-E compactor and EVE optical scan context.
 */

export function renderExplanationPanel(step) {
  if (!step) {
    return `
      <div class="explanation-card">
        <div class="explanation-header">
          <div class="explanation-badge">STANDBY</div>
          <h3 class="panel-heading">WALL•E Operational Telemetry</h3>
        </div>
        <p class="explanation-main-text">Load or compact scrap pile to begin the Quick Sort simulation.</p>
      </div>
    `;
  }

  const {
    type,
    explanation,
    subExplanation,
    low,
    high,
    pivotIndex,
    pivotValue,
    i,
    j
  } = step;

  // Derive human-friendly event title with WALL-E thematic badges
  let actionTitle = "Compactor Step";
  let actionClass = "badge-general";

  switch (type) {
    case "INIT":
      actionTitle = "Scrap Pile Initialized";
      actionClass = "badge-init";
      break;
    case "CALL_QUICKSORT":
      actionTitle = "Recursive Sector Invocation";
      actionClass = "badge-recurse";
      break;
    case "PIVOT_SELECTED":
      actionTitle = "Directive (Pivot) Selected";
      actionClass = "badge-pivot";
      break;
    case "COMPARE":
      actionTitle = "EVE Optical Scan (arr[j] vs Directive)";
      actionClass = "badge-compare";
      break;
    case "SWAP":
      actionTitle = "Compactor Shift (arr[i] ⇄ arr[j])";
      actionClass = "badge-swap";
      break;
    case "IN_PLACE_LE":
      actionTitle = "Element In-Place (arr[j] ≤ Directive)";
      actionClass = "badge-compare";
      break;
    case "GREATER_THAN_PIVOT":
      actionTitle = "Element > Directive (Shift j forward)";
      actionClass = "badge-general";
      break;
    case "PARTITION_END_SCAN":
      actionTitle = "Sector Scan Complete";
      actionClass = "badge-recurse";
      break;
    case "SWAP_PIVOT":
      actionTitle = "Fixing Directive in Position";
      actionClass = "badge-swap";
      break;
    case "PIVOT_PLACED":
      actionTitle = "Directive Permanently Placed 🌱";
      actionClass = "badge-sorted";
      break;
    case "RECURSE_LEFT_PREPARE":
      actionTitle = "Divide & Conquer: Left Sector";
      actionClass = "badge-recurse";
      break;
    case "RECURSE_RIGHT_PREPARE":
      actionTitle = "Divide & Conquer: Right Sector";
      actionClass = "badge-recurse";
      break;
    case "BASE_CASE_SINGLE":
      actionTitle = "Single Cube Base Case 🌱";
      actionClass = "badge-sorted";
      break;
    case "BASE_CASE_EMPTY":
      actionTitle = "Empty Sector Base Case";
      actionClass = "badge-general";
      break;
    case "SORT_COMPLETE":
      actionTitle = "Directive Accomplished! All Sorted 🌱";
      actionClass = "badge-sorted";
      break;
    default:
      actionTitle = type;
  }

  const hasPivot = pivotValue !== null && pivotValue !== undefined;
  const hasRange = low >= 0 && high >= 0;

  return `
    <div class="explanation-card">
      <div class="explanation-header">
        <div class="explanation-title-row">
          <span class="explanation-badge ${actionClass}">${actionTitle}</span>
          <h3 class="panel-heading">WALL•E Operational Telemetry</h3>
        </div>
        ${hasRange ? `
          <div class="explanation-meta-pills">
            <span class="meta-pill pill-range">Sector: Index ${low} → ${high}</span>
            ${hasPivot ? `<span class="meta-pill pill-pivot">Directive: <strong>${pivotValue}</strong> (index ${pivotIndex})</span>` : ''}
            <span class="meta-pill pill-rule">Rule: Lomuto Last Element</span>
          </div>
        ` : ''}
      </div>

      <div class="explanation-body">
        <p class="explanation-main-text">${explanation}</p>
        ${subExplanation ? `<p class="explanation-sub-text">⚡ ${subExplanation}</p>` : ''}
      </div>

      <!-- Quick Pointer Reminder Guide -->
      <div class="pointer-legend-bar">
        <div class="pointer-legend-item">
          <span class="legend-badge badge-i-small">Pointer i (${i >= 0 ? i : 'low-1'})</span>
          <span class="legend-desc">WALL•E compactor boundary for elements ≤ Directive</span>
        </div>
        <div class="pointer-legend-item">
          <span class="legend-badge badge-j-small">Pointer j (${j >= 0 ? j : 'low'})</span>
          <span class="legend-desc">EVE optical sensor scanning scrap sector (low to high-1)</span>
        </div>
      </div>
    </div>
  `;
}
