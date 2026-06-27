#!/bin/bash
# Quick script to activate venv and run the app

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "Virtual environment not found. Creating..."
    python3 -m venv venv
    echo "Installing dependencies..."
    source venv/bin/activate
    pip install -r requirements.txt
fi

# Activate venv
echo "Activating virtual environment..."
source venv/bin/activate

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env and add your POLYGON_TOKEN"
fi

# Run the app
echo ""
echo "Starting StockPredictor API..."
echo "API will be available at: http://localhost:8000"
echo "Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python run.py
