# StockPredictor

A 30-day bullish stock scanner that analyzes market tickers using technical analysis to identify promising breakout candidates.

## Quick Start (After Python Installation)

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

This will:
1. Create a virtual environment (if needed)
2. Install dependencies
3. Start the API server

The API will be available at: **http://localhost:8000**

## Setup Requirements

- **Python 3.9+** (3.11+ recommended)
- **pip** (comes with Python)

### First-Time Setup

If Python isn't installed, follow the [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions.

## Available Endpoints

- `GET /health` — Health check
- `POST /scan` — Run a full universe scan
- `GET /ticker/{symbol}` — Analyze a single ticker
- `GET /docs` — Interactive API documentation (Swagger UI)
- `GET /redoc` — ReDoc documentation

## Project Structure

```
StockPredictor/
├── backend/              # FastAPI backend
│   ├── app/              # Application modules
│   ├── run.py            # Entry point
│   ├── run_dev.ps1       # Windows development runner
│   ├── run_dev.sh        # Unix development runner
│   ├── setup_venv.ps1    # Windows venv setup
│   ├── setup_venv.sh     # Unix venv setup
│   └── requirements.txt   # Python dependencies
├── frontend/             # React frontend (coming soon)
├── .kiro/                # Kiro workspace config
└── SETUP_GUIDE.md        # Detailed setup instructions
```

## Development

### Manual Virtual Environment Setup

```powershell
# Windows
python -m venv backend/venv
.\backend\venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt
```

```bash
# macOS/Linux
python3 -m venv backend/venv
source backend/venv/bin/activate
pip install -r backend/requirements.txt
```

### Run the Server

```powershell
# Windows
.\backend\venv\Scripts\Activate.ps1
python backend/run.py
```

```bash
# macOS/Linux
source backend/venv/bin/activate
python backend/run.py
```

### Configuration

1. Copy `.env.example` to `.env`:
   ```powershell
   Copy-Item backend\.env.example -Destination backend\.env
   ```

2. Edit `backend/.env` and add your `POLYGON_TOKEN`:
   ```
   POLYGON_TOKEN=your_api_key_here
   ```

3. Optional settings:
   ```
   PORT=8000
   HOST=0.0.0.0
   RELOAD=true
   LOG_LEVEL=INFO
   ```

## Testing the API

### Health Check
```bash
curl http://localhost:8000/health
```

### Interactive Documentation
Open your browser to: **http://localhost:8000/docs**

## Features

- ✅ FastAPI backend with async support
- ✅ Technical analysis indicators (SMA, EMA, MACD, ATR, RS, RMV15)
- ✅ Pattern detection (VCP, Flat Base, Darvas, Tight Flag)
- ✅ Multi-strategy scoring (Minervini, Stine, Elder)
- ✅ Configuration-driven thresholds
- ⏳ Full scan pipeline (in development)
- ⏳ React frontend (planned)

## Troubleshooting

### Issue: "Python not found"
→ Install Python from [python.org](https://www.python.org/) and ensure "Add to PATH" is checked

### Issue: "Module not found"
→ Ensure virtual environment is activated and dependencies are installed: `pip install -r requirements.txt`

### Issue: "Port 8000 already in use"
→ Change port: `python run.py --port 8001` or set PORT environment variable

For more troubleshooting, see [SETUP_GUIDE.md](SETUP_GUIDE.md)

## Architecture

See [.kiro/steering/](backend/.kiro/steering/) for detailed documentation on:
- **product.md** — Product overview and features
- **tech.md** — Tech stack and build system
- **structure.md** — Project organization and architecture
