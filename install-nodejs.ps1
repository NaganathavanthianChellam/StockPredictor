# Node.js Automated Installer for Windows
# This script downloads and installs Node.js LTS

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Node.js Installer for StockPredictor" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is already installed
try {
    $existingVersion = node --version 2>$null
    if ($existingVersion) {
        Write-Host "✓ Node.js is already installed!" -ForegroundColor Green
        Write-Host "Version: $existingVersion" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "You can proceed to install frontend dependencies:" -ForegroundColor Green
        Write-Host "  cd frontend" -ForegroundColor White
        Write-Host "  npm install" -ForegroundColor White
        Write-Host "  npm run dev" -ForegroundColor White
        exit 0
    }
} catch {
    Write-Host "Node.js is not installed. Proceeding with installation..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[1/4] Downloading Node.js LTS installer..." -ForegroundColor Yellow

# Node.js LTS download URL
$nodeVersion = "20.11.1"
$nodeUrl = "https://nodejs.org/dist/v$nodeVersion/node-v$nodeVersion-x64.msi"
$installerPath = "$env:TEMP\nodejs-installer.msi"

try {
    # Download Node.js installer
    Write-Host "Downloading from: $nodeUrl" -ForegroundColor Gray
    Invoke-WebRequest -Uri $nodeUrl -OutFile $installerPath -UseBasicParsing
    Write-Host "✓ Download complete!" -ForegroundColor Green
} catch {
    Write-Host "✗ Download failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please download manually from:" -ForegroundColor Yellow
    Write-Host "  https://nodejs.org/" -ForegroundColor White
    Write-Host ""
    Write-Host "Or use direct link:" -ForegroundColor Yellow
    Write-Host "  $nodeUrl" -ForegroundColor White
    exit 1
}

Write-Host ""
Write-Host "[2/4] Starting Node.js installation..." -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  IMPORTANT NOTES:" -ForegroundColor Yellow
Write-Host "  • The installer will open in a new window" -ForegroundColor White
Write-Host "  • Keep 'Add to PATH' option CHECKED" -ForegroundColor White
Write-Host "  • Accept all default settings" -ForegroundColor White
Write-Host "  • Wait for installation to complete" -ForegroundColor White
Write-Host ""

# Install Node.js silently
try {
    Write-Host "Installing Node.js (this may take 2-3 minutes)..." -ForegroundColor Gray
    Start-Process msiexec.exe -ArgumentList "/i `"$installerPath`" /quiet /norestart" -Wait
    Write-Host "✓ Installation complete!" -ForegroundColor Green
} catch {
    Write-Host "✗ Silent installation failed. Opening installer manually..." -ForegroundColor Yellow
    Start-Process $installerPath
    Write-Host ""
    Write-Host "Please complete the installation manually:" -ForegroundColor Yellow
    Write-Host "  1. Follow the installation wizard" -ForegroundColor White
    Write-Host "  2. Keep 'Add to PATH' checked" -ForegroundColor White
    Write-Host "  3. Click 'Install' and wait" -ForegroundColor White
    Write-Host "  4. After installation, run this script again" -ForegroundColor White
    exit 0
}

Write-Host ""
Write-Host "[3/4] Verifying installation..." -ForegroundColor Yellow

# Refresh environment variables
$machinePath = [System.Environment]::GetEnvironmentVariable("Path", "Machine")
$userPath = [System.Environment]::GetEnvironmentVariable("Path", "User")
$env:Path = $machinePath + ";" + $userPath

# Verify installation
Start-Sleep -Seconds 2
try {
    $nodePath = "C:\Program Files\nodejs\node.exe"
    $npmPath = "C:\Program Files\nodejs\npm.cmd"
    $nodeVer = & $nodePath --version 2>$null
    $npmVer = & $npmPath --version 2>$null
    
    if ($nodeVer -and $npmVer) {
        Write-Host "✓ Node.js installed successfully!" -ForegroundColor Green
        Write-Host "Node.js version: $nodeVer" -ForegroundColor Yellow
        Write-Host "npm version: $npmVer" -ForegroundColor Yellow
    } else {
        throw "Verification failed"
    }
} catch {
    Write-Host "⚠️  Installation completed, but verification failed" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please:" -ForegroundColor Yellow
    Write-Host "  1. Close ALL PowerShell windows" -ForegroundColor White
    Write-Host "  2. Open a NEW PowerShell window" -ForegroundColor White
    Write-Host "  3. Run: node --version" -ForegroundColor White
    Write-Host ""
    Write-Host "If 'node --version' works, installation was successful!" -ForegroundColor Green
    exit 0
}

Write-Host ""
Write-Host "[4/4] Cleaning up..." -ForegroundColor Yellow
Remove-Item $installerPath -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Installation Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  IMPORTANT: You must restart PowerShell!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Green
Write-Host "  1. Close this PowerShell window" -ForegroundColor White
Write-Host "  2. Open a NEW PowerShell window" -ForegroundColor White
Write-Host "  3. cd C:\Users\user\Desktop\Projects\StockPredictor\frontend" -ForegroundColor White
Write-Host "  4. npm install" -ForegroundColor White
Write-Host "  5. npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Then open your browser to: http://localhost:3000" -ForegroundColor Green
Write-Host ""
