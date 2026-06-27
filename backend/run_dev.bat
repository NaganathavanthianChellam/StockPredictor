@echo off
REM Quick Windows batch script to run StockPredictor in dev mode

setlocal enabledelayedexpansion

echo.
echo ========================================
echo StockPredictor Development Runner
echo ========================================
echo.

REM Check if venv exists
if not exist "venv\" (
    echo [1/3] Creating virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo ERROR: Failed to create venv. Is Python installed?
        pause
        exit /b 1
    )
    echo OK - Virtual environment created
    echo.
    
    echo [2/3] Activating virtual environment...
    call venv\Scripts\activate.bat
    
    echo.
    echo [3/3] Installing dependencies...
    python -m pip install --upgrade pip --quiet
    pip install -r requirements.txt
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
    echo OK - Dependencies installed
) else (
    echo [1/1] Activating virtual environment...
    call venv\Scripts\activate.bat
    echo OK - Virtual environment activated
)

echo.

REM Create .env if it doesn't exist
if not exist ".env" (
    echo Creating .env from template...
    copy .env.example .env
    echo WARNING: Please edit .env and add your POLYGON_TOKEN
    echo.
)

REM Run the app
echo ========================================
echo Starting StockPredictor API
echo ========================================
echo.
echo API: http://localhost:8000
echo Docs: http://localhost:8000/docs
echo.
echo Press Ctrl+C to stop the server
echo.

python run.py
