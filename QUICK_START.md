# 🚀 Quick Start - 2 Minutes

## Prerequisites
- **Python 3.9+** installed (download from [python.org](https://www.python.org/))

## One-Command Setup

### Windows (PowerShell)
```powershell
cd backend
.\run_dev.ps1
```

### Windows (Command Prompt)
```cmd
cd backend
run_dev.bat
```

### macOS/Linux
```bash
cd backend
chmod +x run_dev.sh
./run_dev.sh
```

**That's it!** The script will:
- Create a virtual environment
- Install all dependencies
- Start the API server

## Verify It Works

Visit: **http://localhost:8000/docs**

You should see the interactive API documentation.

## Test the API

```bash
curl http://localhost:8000/health
```

Response:
```json
{"status": "ok", "as_of": "2026-06-27T...", "timestamp": "2026-06-27T..."}
```

## Next: Add Your API Key

1. Edit `backend/.env`
2. Set your `POLYGON_TOKEN`
3. Restart the server (Ctrl+C, then run `python run.py` again)

## Subsequent Runs

```powershell
# Windows
cd backend
.\venv\Scripts\Activate.ps1
python run.py
```

```bash
# macOS/Linux
cd backend
source venv/bin/activate
python run.py
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Python not found" | Install Python from [python.org](https://www.python.org/) |
| "Module not found" | Venv not activated or deps not installed |
| "Port 8000 in use" | Edit `backend/.env` and change `PORT=8001` |

## More Help

- **Full Setup Guide**: `SETUP_GUIDE.md`
- **Development Guide**: `backend/DEVELOPMENT.md`
- **All Info**: `VIRTUAL_ENV_READY.md`

---

**🎉 You're all set! Start with the docs at http://localhost:8000/docs**
