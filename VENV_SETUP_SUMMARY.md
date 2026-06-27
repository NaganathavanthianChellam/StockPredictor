# Virtual Environment Setup - Summary

I've enhanced the StockPredictor application to work seamlessly in a virtual environment. Here's what was done:

## 📦 What Was Created

### 1. Setup Scripts
- **`backend/run_dev.ps1`** — Windows PowerShell script that automatically:
  - Creates venv if needed
  - Activates venv
  - Installs dependencies
  - Starts the API server
  
- **`backend/run_dev.sh`** — macOS/Linux bash script (same functionality)

- **`backend/setup_venv.ps1`** — Standalone Windows venv setup script
- **`backend/setup_venv.sh`** — Standalone Unix venv setup script

### 2. Configuration Files
- **`backend/.env.example`** — Environment variable template
- **`backend/requirements.txt`** — Updated with all dependencies + dev tools
- **`backend/requirements-dev.txt`** — Optional development dependencies
- **`.gitignore`** — Project-wide Git ignore rules
- **`backend/.gitignore`** — Backend-specific ignore rules

### 3. Enhanced Application Code
- **`backend/run.py`** — Improved entry point with:
  - Automatic `.env` loading via `python-dotenv`
  - Proper path configuration
  - Better error handling
  - Logging for diagnostics

- **`backend/app/main.py`** — Enhanced FastAPI app with:
  - Environment variable checks
  - Better logging
  - CORS configuration
  - Proper API documentation setup

### 4. Documentation
- **`SETUP_GUIDE.md`** — Comprehensive setup instructions for all platforms
- **`README.md`** — Updated with quick start commands
- **`VENV_SETUP_SUMMARY.md`** — This file

## 🚀 Quick Start (After Python Installation)

### Windows (PowerShell)
```powershell
cd backend
.\run_dev.ps1
```

### macOS/Linux (Bash)
```bash
cd backend
chmod +x run_dev.sh
./run_dev.sh
```

That's it! The scripts handle everything.

## 📋 Manual Setup (If Preferred)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
.\venv\Scripts\Activate.ps1
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env and add your POLYGON_TOKEN

# Run the app
python run.py
```

## 🔑 Key Improvements

1. **Automated Setup** — Run scripts handle all venv creation and dependency installation
2. **Environment Loading** — Application automatically loads `.env` file
3. **Better Error Handling** — Clear error messages if dependencies are missing
4. **Development Friendly** — Includes optional dev tools (pytest, black, mypy)
5. **Cross-Platform** — Works on Windows, macOS, and Linux
6. **Documentation** — Comprehensive guides for various scenarios

## 📍 Virtual Environment Location

```
backend/
  venv/              ← Virtual environment directory
    Scripts/         ← Executable scripts (Windows)
    bin/             ← Executable scripts (macOS/Linux)
    lib/             ← Python packages
    pyvenv.cfg       ← Configuration
```

## ✅ Verification

Once running, verify the API is working:

```bash
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

View interactive docs:
```
http://localhost:8000/docs
```

## 🔧 Troubleshooting

### Python Not Found
- Install Python from [python.org](https://www.python.org/)
- Ensure "Add Python to PATH" is checked during installation

### Dependencies Not Installing
- Make sure venv is activated (you should see `(venv)` in your terminal prompt)
- Try: `pip install --upgrade pip` then `pip install -r requirements.txt`

### Port Already in Use
- Change the port: Edit `backend/.env` and set `PORT=8001`
- Or run: `$env:PORT=8001; python run.py` (Windows)

### Execution Policy Error (Windows)
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 📚 Next Steps

1. Install Python (if not already done)
2. Run `./run_dev.ps1` (Windows) or `./run_dev.sh` (macOS/Linux)
3. Edit `.env` with your `POLYGON_TOKEN`
4. Visit `http://localhost:8000/docs` to explore the API
5. Implement the scan pipeline (`app/pipeline.py` and `app/scoring.py`)

## 🛠️ Development Tips

### Add a New Dependency
```bash
pip install new_package
pip freeze > requirements.txt
```

### Deactivate Virtual Environment
```bash
deactivate
```

### Reinstall from Scratch
```bash
rm -r venv/        # Remove old venv
python -m venv venv  # Create new one
pip install -r requirements.txt
```

### Run in Production Mode
```powershell
$env:RELOAD = 'false'
python run.py
```

---

Everything is ready! Once Python is installed on your system, you can immediately get the app running with a single command.
