#!/bin/bash
# StockPredictor Virtual Environment Setup Script for macOS/Linux

echo "========================================"
echo "StockPredictor Virtual Environment Setup"
echo "========================================"
echo ""

# Check if Python is installed
echo "[1/5] Checking Python installation..."
if ! command -v python3 &> /dev/null; then
    echo "✗ Python3 not found"
    echo ""
    echo "Please install Python 3.9+ from https://www.python.org/downloads/"
    exit 1
fi

python_version=$(python3 --version)
echo "✓ Python found: $python_version"
echo ""

# Create virtual environment
echo "[2/5] Creating virtual environment..."
if [ -d "venv" ]; then
    echo "Virtual environment already exists. Skipping creation."
else
    python3 -m venv venv
    if [ $? -eq 0 ]; then
        echo "✓ Virtual environment created"
    else
        echo "✗ Failed to create virtual environment"
        exit 1
    fi
fi
echo ""

# Activate virtual environment
echo "[3/5] Activating virtual environment..."
source venv/bin/activate
if [ $? -eq 0 ]; then
    echo "✓ Virtual environment activated"
else
    echo "✗ Failed to activate virtual environment"
    exit 1
fi
echo ""

# Upgrade pip
echo "[4/5] Upgrading pip..."
python -m pip install --upgrade pip --quiet
if [ $? -eq 0 ]; then
    echo "✓ pip upgraded"
else
    echo "✗ Failed to upgrade pip"
    exit 1
fi
echo ""

# Install requirements
echo "[5/5] Installing dependencies..."
pip install -r requirements.txt
if [ $? -eq 0 ]; then
    echo "✓ Dependencies installed"
else
    echo "✗ Failed to install dependencies"
    exit 1
fi

echo ""
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Copy .env.example to .env: cp .env.example .env"
echo "2. Edit .env and add your POLYGON_TOKEN"
echo "3. Run the app: python run.py"
echo ""
echo "API will be available at: http://localhost:8000"
echo "Interactive Docs: http://localhost:8000/docs"
echo ""
