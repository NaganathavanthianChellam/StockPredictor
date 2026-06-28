# Simple Node.js Installer
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Node.js Installer for StockPredictor" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is already installed
Write-Host "[1/4] Checking for existing Node.js installation..." -ForegroundColor Yellow
try {
    $existingVersion = node --version 2>$null
    if ($existingVersion) {
        Write-Host "✓ Node.js is already installed!" -ForegroundColor Green
        Write-Host "Version: $existingVersion" -ForegroundColor Yellow
        exit 0
    }
} catch {
    Write-Host "Node.js not found. Proceeding with installation..." -ForegroundColor Gray
}

Write-Host ""
Write-Host "[2/4] Downloading Node.js LTS..." -ForegroundColor Yellow

$nodeVersion = "20.11.1"
$nodeUrl = "https://nodejs.org/dist/v$nodeVersion/node-v$nodeVersion-x64.msi"
$installerPath = Join-Path $env:TEMP "nodejs-installer.msi"

try {
    Invoke-WebRequest -Uri $nodeUrl -OutFile $installerPath -UseBasicParsing
    Write-Host "✓ Download complete!" -ForegroundColor Green
} catch {
    Write-Host "✗ Download failed!" -ForegroundColor Red
    Write-Host "Please download manually from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "[3/4] Installing Node.js..." -ForegroundColor Yellow
Write-Host "This will take 2-3 minutes. Please wait..." -ForegroundColor Gray

try {
    $arguments = "/i `"$installerPath`" /quiet /norestart"
    Start-Process "msiexec.exe" -ArgumentList $arguments -Wait -NoNewWindow
    Write-Host "✓ Installation complete!" -ForegroundColor Green
} catch {
    Write-Host "Silent install failed. Opening manual installer..." -ForegroundColor Yellow
    Start-Process $installerPath
    exit 0
}

Write-Host ""
Write-Host "[4/4] Cleaning up..." -ForegroundColor Yellow
Remove-Item $installerPath -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Installation Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  IMPORTANT: Restart PowerShell!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Close this PowerShell window" -ForegroundColor White
Write-Host "  2. Open a NEW PowerShell window" -ForegroundColor White  
Write-Host "  3. cd frontend" -ForegroundColor White
Write-Host "  4. npm install" -ForegroundColor White
Write-Host "  5. npm run dev" -ForegroundColor White
Write-Host ""
