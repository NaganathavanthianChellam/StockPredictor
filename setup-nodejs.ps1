# Node.js Setup Script
$ErrorActionPreference = "Stop"

Write-Host "Installing Node.js..." -ForegroundColor Cyan

# Check existing installation
try {
    $ver = node --version 2>$null
    if ($ver) {
        Write-Host "Node.js already installed: $ver" -ForegroundColor Green
        exit 0
    }
} catch {}

# Download
$url = "https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi"
$out = "$env:TEMP\node-install.msi"

Write-Host "Downloading..." -ForegroundColor Yellow
Invoke-WebRequest -Uri $url -OutFile $out

# Install
Write-Host "Installing (please wait 2-3 minutes)..." -ForegroundColor Yellow
Start-Process msiexec.exe -ArgumentList "/i $out /quiet /norestart" -Wait

Write-Host "Done! Please restart PowerShell." -ForegroundColor Green
