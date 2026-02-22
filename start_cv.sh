#!/bin/bash
# Script to start a simple local server for the CV

# Try to open directly first (easiest)
if command -v open &> /dev/null; then
    open index.html
    echo "Opening CV in default browser..."
    exit 0
fi

# Fallback to python server if open fails or on Linux/Windows without 'open'
if command -v python3 &> /dev/null; then
    echo "Starting local server with Python 3..."
    python3 -m http.server 8080 &
    SERVER_PID=$!
    sleep 2
    
    if command -v open &> /dev/null; then
        open "http://localhost:8080"
    elif command -v xdg-open &> /dev/null; then
        xdg-open "http://localhost:8080"
    else
        echo "Please open http://localhost:8080 in your browser."
    fi
    
    echo "Server running at http://localhost:8080 (PID: $SERVER_PID)"
    echo "Press Ctrl+C to stop."
    wait $SERVER_PID
    exit 0
fi

echo "Could not automatically open. Please double-click 'index.html' in your file explorer."
