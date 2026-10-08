"""
Quick Sort Visualizer — WALL•E Edition Entry Point
Supports both execution modes:
1. Streamlit Mode:
   streamlit run app.py
   (Renders full-viewport React UI with zero Streamlit UI chrome)

2. Standalone Python Web Server Mode (Recommended for Docker / Cloud Run):
   python app.py
   (Listens on $PORT or 8080, binds to 0.0.0.0, ultra-fast and lightweight)
"""

import sys
import os
import webbrowser

# Add src to sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
src_dir = os.path.join(current_dir, "src")
if src_dir not in sys.path:
    sys.path.insert(0, src_dir)

import streamlit as st


def run_standalone_server():
    import http.server
    import socketserver

    port = int(os.environ.get("PORT", 8080))

    class CustomHandler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=current_dir, **kwargs)

    print("\n" + "=" * 65)
    print("🚀 QUICK SORT VISUALIZER — WALL•E EDITION")
    print("=" * 65)
    print(f"Server Running at http://0.0.0.0:{port}/index.html")
    print("Press Ctrl+C to stop the server.")
    print("=" * 65 + "\n")

    # Only attempt browser launch if not in headless container
    if os.environ.get("HEADLESS", "").lower() not in ("1", "true", "yes"):
        try:
            webbrowser.open(f"http://localhost:{port}/index.html")
        except Exception:
            pass

    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("0.0.0.0", port), CustomHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
            httpd.server_close()


def main_dispatcher():
    # If running inside Streamlit runtime
    if st.runtime.exists():
        from App import main
        main()
    else:
        # Running via `python app.py`
        run_standalone_server()


if __name__ == "__main__":
    main_dispatcher()
