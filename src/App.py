"""
Streamlit Application for DAA CIA 3(B) - Interactive Quick Sort Simulator.
Topic: Quick Sort using Pivot Selection and Partitioning (Lomuto Partition Scheme).

Customized so that the UI does NOT feel like Streamlit:
- Completely neutralizes all default Streamlit chrome (navbar, hamburger, footer, status widget, sidebar)
- Serves a 100% full-viewport React 18 single-page application built with HTML, CSS, JavaScript & React
- Zero backend dependencies, runs fully offline with pure client-side state
"""

import os
import re
import streamlit as st
import streamlit.components.v1 as components


def load_file(filepath: str) -> str:
    """Helper to safely read file content."""
    with open(filepath, "r", encoding="utf-8") as f:
        return f.read()


def clean_for_inlining(js_code: str) -> str:
    """Strips ES module export statements for direct in-browser script execution."""
    cleaned = re.sub(r'\bexport\s+default\s+', '', js_code)
    cleaned = re.sub(r'\bexport\s+(class|function|const|let|var)\s+', r'\1 ', cleaned)
    return cleaned


def build_interactive_html(base_dir: str) -> str:
    """
    Bundles the modular CSS, React engine, JavaScript algorithms, components,
    and React App component into a self-contained, high-performance web app.
    """
    css_path = os.path.join(base_dir, "App.css")
    react_engine_path = os.path.join(base_dir, "react", "react.js")
    quick_sort_js_path = os.path.join(base_dir, "algorithms", "quickSort.js")
    examples_js_path = os.path.join(base_dir, "data", "examples.js")
    array_vis_js_path = os.path.join(base_dir, "components", "ArrayVisualizer", "ArrayVisualizer.js")
    controls_js_path = os.path.join(base_dir, "components", "Controls", "Controls.js")
    explanation_js_path = os.path.join(base_dir, "components", "ExplanationPanel", "ExplanationPanel.js")
    tree_js_path = os.path.join(base_dir, "components", "RecursiveTree", "RecursiveTree.js")
    alg_js_path = os.path.join(base_dir, "components", "AlgorithmPanel", "AlgorithmPanel.js")
    comp_js_path = os.path.join(base_dir, "components", "ComplexityPanel", "ComplexityPanel.js")
    concepts_js_path = os.path.join(base_dir, "components", "ConceptsPanel", "ConceptsPanel.js")
    walle_theme_js_path = os.path.join(base_dir, "theme", "walleTheme.js")
    app_react_js_path = os.path.join(base_dir, "App.js")

    app_css = load_file(css_path) if os.path.exists(css_path) else ""
    react_engine_js = load_file(react_engine_path) if os.path.exists(react_engine_path) else ""
    walle_theme_js = clean_for_inlining(load_file(walle_theme_js_path)) if os.path.exists(walle_theme_js_path) else ""
    quick_sort_js = clean_for_inlining(load_file(quick_sort_js_path)) if os.path.exists(quick_sort_js_path) else ""
    examples_js = clean_for_inlining(load_file(examples_js_path)) if os.path.exists(examples_js_path) else ""
    array_vis_js = clean_for_inlining(load_file(array_vis_js_path)) if os.path.exists(array_vis_js_path) else ""
    controls_js = clean_for_inlining(load_file(controls_js_path)) if os.path.exists(controls_js_path) else ""
    explanation_js = clean_for_inlining(load_file(explanation_js_path)) if os.path.exists(explanation_js_path) else ""
    tree_js = clean_for_inlining(load_file(tree_js_path)) if os.path.exists(tree_js_path) else ""
    alg_js = clean_for_inlining(load_file(alg_js_path)) if os.path.exists(alg_js_path) else ""
    comp_js = clean_for_inlining(load_file(comp_js_path)) if os.path.exists(comp_js_path) else ""
    concepts_js = clean_for_inlining(load_file(concepts_js_path)) if os.path.exists(concepts_js_path) else ""
    app_react_js = clean_for_inlining(load_file(app_react_js_path)) if os.path.exists(app_react_js_path) else ""

    # Bundle into an HTML template containing only #root where React mounts
    html_template = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quick Sort Visualizer - WALL•E Edition</title>
  <link rel="icon" type="image/png" href="favicon.png">
  <link rel="apple-touch-icon" href="favicon.png">
  <style>
    {app_css}
    
    /* Ensure full-viewport rendering inside iframe without dual scrollbars */
    html, body {{
      width: 100%;
      min-height: 100%;
      margin: 0;
      padding: 0;
      background-color: var(--chassis-bg, #14110E);
    }}
  </style>
</head>
<body>
  <!-- React Mount Root -->
  <div id="root"></div>

  <!-- React 18 Engine & Modular Components -->
  <script>
    {react_engine_js}
    {walle_theme_js}
    {quick_sort_js}
    {examples_js}
    {array_vis_js}
    {controls_js}
    {explanation_js}
    {tree_js}
    {alg_js}
    {comp_js}
    {concepts_js}
    {app_react_js}
  </script>
</body>
</html>
"""
    return html_template


def main():
    favicon_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "favicon.png")
    icon = favicon_path if os.path.exists(favicon_path) else "⚡"

    st.set_page_config(
        page_title="Quick Sort Visualizer | WALL•E Edition",
        page_icon=icon,
        layout="wide",
        initial_sidebar_state="collapsed"
    )

    # Completely hide Streamlit UI elements to ensure a pure HTML/CSS/JS/React look and feel
    st.markdown(
        """
        <style>
            /* Hide Streamlit Header, Toolbar, Deploy Button, and Status Widget */
            header[data-testid="stHeader"] {display: none !important;}
            #MainMenu {visibility: hidden !important; display: none !important;}
            footer {visibility: hidden !important; display: none !important;}
            div[data-testid="stToolbar"] {visibility: hidden !important; display: none !important;}
            div[data-testid="stDecoration"] {visibility: hidden !important; display: none !important;}
            div[data-testid="stStatusWidget"] {visibility: hidden !important; display: none !important;}
            .stAppDeployButton {display: none !important;}
            section[data-testid="stSidebar"] {display: none !important;}

            /* Remove Streamlit padding and reset margins */
            .stApp {
                background-color: #F8FAFC !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            .main .block-container {
                padding-top: 0rem !important;
                padding-bottom: 0rem !important;
                padding-left: 0rem !important;
                padding-right: 0rem !important;
                max-width: 100% !important;
            }
            iframe {
                width: 100% !important;
                min-height: 100vh !important;
                border: none !important;
            }
        </style>
        """,
        unsafe_allow_html=True
    )

    base_dir = os.path.dirname(os.path.abspath(__file__))
    html_content = build_interactive_html(base_dir)

    # Render full-page React Application
    components.html(html_content, height=1850, scrolling=False)


if __name__ == "__main__":
    main()
