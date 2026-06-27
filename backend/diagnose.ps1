# Diagnostic script to check StockPredictor environment setup

Write-Host "StockPredictor Environment Diagnostic" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

$issues = 0

# Check Python
Write-Host "[1] Checking Python installation..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✓ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Python not found in PATH" -ForegroundColor Red
    $issues++
}

# Check venv
Write-Host "[2] Checking virtual environment..." -ForegroundColor Yellow
if (Test-Path "venv") {
    Write-Host "✓ Virtual environment exists at: venv/" -ForegroundColor Green
    
    if (Test-Path "venv\Scripts\python.exe") {
        Write-Host "✓ Venv Python executable found" -ForegroundColor Green
    } else {
        Write-Host "✗ Venv Python executable not found" -ForegroundColor Red
        $issues++
    }
} else {
    Write-Host "⚠ Virtual environment not found" -ForegroundColor Yellow
    Write-Host "  Run: .\run_dev.ps1 to create it" -ForegroundColor Yellow
}

# Check dependencies (if venv exists)
if (Test-Path "venv\Scripts\python.exe") {
    Write-Host "[3] Checking installed packages..." -ForegroundColor Yellow
    
    $packages = @("fastapi", "uvicorn", "pydantic", "numpy", "pandas", "python-dotenv")
    foreach ($pkg in $packages) {
        $installed = & venv\Scripts\python.exe -c "import $($pkg.Replace('-', '_'))" 2>$null
        if ($?) {
            Write-Host "  ✓ $pkg" -ForegroundColor Green
        } else {
            Write-Host "  ✗ $pkg (missing)" -ForegroundColor Red
            $issues++
        }
    }
} else {
    Write-Host "[3] Skipping package check (venv not found)" -ForegroundColor Yellow
}

# Check .env
Write-Host "[4] Checking configuration..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "✓ .env file exists" -ForegroundColor Green
    
    $envContent = Get-Content ".env" -Raw
    if ($envContent -match "POLYGON_TOKEN") {
        $hasToken = $envContent -match "POLYGON_TOKEN\s*=\s*[^\s]"
        if ($hasToken) {
            Write-Host "✓ POLYGON_TOKEN configured" -ForegroundColor Green
        } else {
            Write-Host "⚠ POLYGON_TOKEN not set (empty value)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "⚠ POLYGON_TOKEN not found in .env" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠ .env file not found" -ForegroundColor Yellow
    Write-Host "  Copy from template: Copy-Item .env.example -Destination .env" -ForegroundColor Yellow
}

# Check port availability
Write-Host "[5] Checking port availability..." -ForegroundColor Yellow
$port = 8000
$portInUse = Test-NetConnection -ComputerName 127.0.0.1 -Port $port -WarningAction SilentlyContinue
if ($portInUse.TcpTestSucceeded) {
    Write-Host "⚠ Port $port appears to be in use" -ForegroundColor Yellow
    Write-Host "  Change port in .env: PORT=8001" -ForegroundColor Yellow
} else {
    Write-Host "✓ Port $port is available" -ForegroundColor Green
}

# Summary
Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
if ($issues -eq 0) {
    Write-Host "✓ Everything looks good!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Ensure .env has POLYGON_TOKEN configured" -ForegroundColor White
    Write-Host "2. Run: python run.py" -ForegroundColor White
    Write-Host "3. Visit: http://localhost:8000/docs" -ForegroundColor White
} else {
    Write-Host "✗ Found $issues issue(s)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Run .\run_dev.ps1 to fix and setup everything automatically" -ForegroundColor Yellow
}
Write-Host ""
