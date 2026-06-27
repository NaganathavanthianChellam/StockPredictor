# Setup script using found Python installation
# This script locates Python and creates a virtual environment with dependencies

$pythonCandidates = @(
  "C:\Users\user\AppData\Local\Programs\LM Studio\resources\app\.webpack\bin\extensions\backends\vendor\_amphibian\cpython3.11-win-x86@6\python.exe",
  "C:\Python312\python.exe",
  "C:\Python311\python.exe",
  "C:\Python310\python.exe",
  "C:\Python39\python.exe"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "StockPredictor Setup with Found Python" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$pythonExe = $null
foreach ($candidate in $pythonCandidates) {
  if (Test-Path $candidate) {
    $pythonExe = $candidate
    Write-Host "[1/5] Python found at:" -ForegroundColor Yellow
    Write-Host "  $pythonExe" -ForegroundColor Green
    & $pythonExe --version
    Write-Host ""
    break
  }
}

if ($null -eq $pythonExe) {
  Write-Host "✗ Python not found" -ForegroundColor Red
  exit 1
}

# Create virtual environment
Write-Host "[2/5] Creating virtual environment..." -ForegroundColor Yellow
& $pythonExe -m venv venv
if ($LASTEXITCODE -eq 0) {
  Write-Host "✓ Virtual environment created" -ForegroundColor Green
} else {
  Write-Host "✗ Failed to create virtual environment" -ForegroundColor Red
  exit 1
}

Write-Host ""

# Activate virtual environment
Write-Host "[3/5] Activating virtual environment..." -ForegroundColor Yellow
& .\venv\Scripts\Activate.ps1
if ($LASTEXITCODE -eq 0) {
  Write-Host "✓ Virtual environment activated" -ForegroundColor Green
} else {
  Write-Host "✗ Failed to activate virtual environment" -ForegroundColor Red
  exit 1
}

Write-Host ""

# Upgrade pip
Write-Host "[4/5] Upgrading pip..." -ForegroundColor Yellow
python -m pip install --upgrade pip --quiet
if ($LASTEXITCODE -eq 0) {
  Write-Host "✓ pip upgraded" -ForegroundColor Green
} else {
  Write-Host "✗ Failed to upgrade pip" -ForegroundColor Red
  exit 1
}

Write-Host ""

# Install requirements
Write-Host "[5/5] Installing dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt
if ($LASTEXITCODE -eq 0) {
  Write-Host "✓ Dependencies installed successfully" -ForegroundColor Green
} else {
  Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
  exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your virtual environment is ready." -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Create .env file: Copy-Item .env.example -Destination .env" -ForegroundColor White
Write-Host "2. Edit .env and add your POLYGON_TOKEN" -ForegroundColor White
Write-Host "3. Run the app: python run.py" -ForegroundColor White
Write-Host ""
Write-Host "API will be available at: http://localhost:8000" -ForegroundColor Green
Write-Host "Interactive Docs: http://localhost:8000/docs" -ForegroundColor Green
Write-Host ""
