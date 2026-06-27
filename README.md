# StockPredictor

A professional stock analysis platform for Indian markets with advanced technical analysis, pattern detection, and AI-powered investment predictions.

## ✨ Features

- 🎯 **Smart Stock Analysis** — Multi-strategy scoring system (Minervini, Stine, Elder)
- 📊 **Indian Market Focus** — 30+ pre-configured NSE/BSE stocks
- 🔍 **Pattern Detection** — VCP, Flat Base, Darvas, Tight Flag patterns
- 💰 **Investment Guidance** — Entry zones, stop loss, price targets with R:R ratios
- 🎨 **Professional UI** — Modern React interface with real-time updates
- 📈 **Technical Indicators** — SMA, EMA, MACD, ATR, RS Rank, RMV15
- 📁 **Data Export** — Export analysis to CSV for further review
- 🔔 **Signal System** — BUY/WATCH/AVOID recommendations

## 🚀 Quick Start

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

## 🌐 Accessing the Application

### Backend API
- **Base URL**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

### Frontend UI
- **Web Interface**: http://localhost:3000
- **Modern React UI** with stock selector and analysis dashboard

## 📡 API Endpoints

- `GET /health` — Health check
- `POST /scan` — Run a full universe scan
- `GET /ticker/{symbol}` — Analyze a single ticker
- `GET /docs` — Interactive API documentation (Swagger UI)
- `GET /redoc` — ReDoc documentation

## 🎨 Frontend Features

### Professional UI Components
- **Stock Selector** — Search, filter by sector, quick-add popular stocks
- **Results Dashboard** — Sortable table with signals and metrics
- **Detail Modal** — Comprehensive analysis with investment thesis
- **Export** — Download results as CSV

### Supported Stocks
- Banking: HDFCBANK, ICICIBANK, KOTAKBANK, SBIN, AXISBANK
- IT: TCS, INFY, WIPRO, HCLTECH, TECHM
- FMCG: HINDUNILVR, ITC, NESTLEIND, BRITANNIA
- Auto: MARUTI, M&M, TATAMOTORS, BAJAJ-AUTO
- Pharma: SUNPHARMA, DRREDDY, CIPLA
- Energy: RELIANCE, ONGC, NTPC, POWERGRID
- And more...

## Project Structure

```
StockPredictor/
├── backend/              # FastAPI backend application
│   ├── app/              # Application modules
│   ├── run.py            # Entry point
│   ├── run_dev.ps1       # Windows development runner
│   ├── run_dev.sh        # Unix development runner
│   ├── setup_venv.ps1    # Windows venv setup
│   ├── setup_venv.sh     # Unix venv setup
│   └── requirements.txt   # Python dependencies
├── frontend/             # React + TypeScript frontend
│   ├── src/              # Source code
│   │   ├── components/   # React components
│   │   ├── services/     # API client
│   │   ├── store/        # State management
│   │   ├── types/        # TypeScript types
│   │   └── utils/        # Utilities
│   ├── package.json      # Node dependencies
│   └── vite.config.ts    # Vite configuration
├── .kiro/                # Kiro workspace config
└── SETUP_GUIDE.md        # Detailed setup instructions
```

## Development

### Backend Setup (Python)

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

Backend will run on `http://localhost:8000`

### Frontend Setup (Node.js)

```bash
# Install dependencies (first time only)
cd frontend
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

### Both Services Running

1. **Terminal 1**: Backend API (Python)
   ```bash
   cd backend
   python run.py
   ```

2. **Terminal 2**: Frontend UI (Node.js)
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open Browser**: http://localhost:3000

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
