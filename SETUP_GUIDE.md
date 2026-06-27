# StockPredictor Setup Guide

## Prerequisites

- **Windows 10/11**
- **Python 3.9+** (recommended: 3.11 or 3.12)

## Step 1: Install Python

### Option A: Download from python.org (Recommended)
1. Go to [python.org/downloads](https://www.python.org/downloads/)
2. Download the latest Python 3.11 or 3.12 installer
3. **Important**: During installation, check the box "Add Python to PATH"
4. Complete the installation
5. Verify: Open PowerShell and run `python --version`

### Option B: Use Windows Package Manager (if available)
```powershell
winget install Python.Python.3.11
```

### Option C: Use Chocolatey (if installed)
```powershell
choco install python
```

## Step 2: Clone/Navigate to Project

```powershell
cd C:\Users\user\Desktop\Projects\StockPredictor
```

## Step 3: Create Virtual Environment

```powershell
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# If you get an execution policy error, run:
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Step 4: Install Dependencies

```powershell
# Make sure venv is activated (you should see (venv) in your prompt)
pip install --upgrade pip

pip install -r requirements.txt
```

## Step 5: Configure Environment

```powershell
# Copy example env file
Copy-Item .env.example -Destination .env

# Edit .env and add your POLYGON_TOKEN
# Edit .env in your text editor and add your API key
```

## Step 6: Run the Application

```powershell
# Make sure venv is activated
python run.py

# Or use uvicorn directly:
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at: `http://localhost:8000`

### API Documentation
- **Interactive Docs (Swagger UI)**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## Step 7: Test the Application

```powershell
# In another PowerShell window (with venv activated):
curl http://localhost:8000/health
```

Expected response:
```json
{
  "status": "ok",
  "as_of": "2026-06-27T...",
  "timestamp": "2026-06-27T..."
}
```

## Troubleshooting

### Problem: "python: The term 'python' is not recognized"
**Solution**: Python is not in PATH. Reinstall Python and ensure "Add Python to PATH" is checked.

### Problem: "ModuleNotFoundError: No module named 'fastapi'"
**Solution**: Make sure virtual environment is activated (`venv\Scripts\Activate.ps1`) and dependencies are installed (`pip install -r requirements.txt`).

### Problem: "Port 8000 already in use"
**Solution**: Change the port in the run command: `python run.py --port 8001`

### Problem: Execution policy error when activating venv
**Solution**: Run this command once:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Deactivating Virtual Environment

When done developing:
```powershell
deactivate
```

## Quick Reference: Common Commands

```powershell
# Activate venv
cd backend
.\venv\Scripts\Activate.ps1

# Deactivate venv
deactivate

# Install new package
pip install package_name

# Freeze dependencies (update requirements.txt)
pip freeze > requirements.txt

# Run app
python run.py

# Run tests (when available)
pytest

# Run linter
flake8 app/
```

## Next Steps

Once the app is running:
1. Check `/docs` for API documentation
2. Test `/health` endpoint
3. Build out the scan pipeline in `app/pipeline.py` and `app/scoring.py`
4. Set up frontend (React)

