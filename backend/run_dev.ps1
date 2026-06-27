# PowerShell script to setup and run StockPredictor in development mode

param(
    [switch]$NoSetup = $false,
    [int]$Port = 8000
)

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "StockPredictor Development Runner" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if venv exists
if (!(Test-Path "venv")) {
    if ($NoSetup) {
        Write-Host "✗ Virtual environment not found and -NoSetup was specified" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "[1/3] Creating virtual environment..." -ForegroundColor Yellow
    try {
        python -m venv venv
        Write-Host "✓ Virtual environment created" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Failed to create venv. Is Python installed and in PATH?" -ForegroundColor Red
        exit 1
    }
    
    Write-Host ""
    Write-Host "[2/3] Activating virtual environment..." -ForegroundColor Yellow
    & .\venv\Scripts\Activate.ps1
    
    Write-Host ""
    Write-Host "[3/3] Installing dependencies..." -ForegroundColor Yellow
    python -m pip install --upgrade pip --quiet
    pip install -r requirements.txt
    Write-Host "✓ Dependencies installed" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "[1/1] Activating virtual environment..." -ForegroundColor Yellow
    & .\venv\Scripts\Activate.ps1
    Write-Host "✓ Virtual environment activated" -ForegroundColor Green
    Write-Host ""
}

# Create .env if it doesn't exist
if (!(Test-Path ".env")) {
    Write-Host "Creating .env from template..." -ForegroundColor Yellow
    Copy-Item .env.example -Destination .env
    Write-Host "⚠️  Please edit .env and add your POLYGON_TOKEN" -ForegroundColor Yellow
    Write-Host ""
}

# Run the app
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting StockPredictor API" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "API: http://localhost:$Port" -ForegroundColor Green
Write-Host "Docs: http://localhost:$Port/docs" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

$env:PORT = $Port
python run.py
