# Project Structure

## Directory Layout

```
StockPredictor/
├── .kiro/                          # Kiro workspace configuration
│   ├── spec.md                     # Project specification & architecture
│   └── steering/                   # Guidance documents (this folder)
│
├── backend/                        # FastAPI backend application
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                 # FastAPI app, endpoint definitions
│   │   ├── config.py               # Configuration object, all thresholds
│   │   ├── client.py               # Massive API client with auth & retry
│   │   ├── cache.py                # BarCache (in-memory with TTL)
│   │   ├── indicators.py           # IndicatorCalculator (SMA, EMA, MACD, ATR, RS, RMV15)
│   │   ├── models.py               # Pydantic schemas for API requests/responses
│   │   ├── utils.py                # Utility functions (clamp, date parsing, etc.)
│   │   └── [pipeline.py]           # TBD: Hard filters, stage 2, patterns (not yet created)
│   │   └── [scoring.py]            # TBD: Composite & final scoring (not yet created)
│   │
│   ├── requirements.txt            # Python dependencies
│   ├── .env.example                # Template for environment variables
│   └── run.py                      # Entry point to start the server
│
├── frontend/                       # React frontend (not yet created)
│   ├── src/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── index.css               # Tailwind CSS imports
│   │   ├── components/
│   │   │   ├── ScanResults.tsx     # Results table with sorting
│   │   │   ├── TickerDetail.tsx    # Single-ticker deep-dive view
│   │   │   └── Header.tsx          # Navigation/branding
│   │   ├── hooks/
│   │   │   └── useApi.ts           # API integration hook
│   │   └── types/                  # TypeScript interfaces (sync with Pydantic)
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── tailwind.config.js
│
├── README.md                       # Project overview
└── .git/                           # Version control

```

## Module Responsibilities

### Backend Core Modules

**config.py**
- Central configuration object with all threshold values
- Scoring weights (Minervini, Stine, Elder)
- Hard filter cutoffs (stage 2 criteria)
- Pattern detection parameters
- Exports: `get_config()` → Dict[str, Any]

**client.py (MassiveClient)**
- Handles authentication with `POLYGON_TOKEN`
- Async HTTP requests with exponential backoff
- Rate limiting (max 5 concurrent requests)
- Methods: `get_universe()`, `get_daily_bars(ticker, from_date, to_date)`

**cache.py (BarCache)**
- In-memory cache for daily bars
- TTL logic: daily bars cached forever, session bars expire at midnight ET
- Methods: `get()`, `get_range()`, `put()`

**indicators.py (IndicatorCalculator)**
- Computes all technical indicators from daily bars
- Supported: SMA, EMA, MACD, ATR, RS rank, RMV15
- All calculations respect `as_of` boundary (no look-ahead)
- Exports: `compute_all()` → Dict[str, Any] with all signals

**models.py**
- Pydantic schemas for API contracts
- `ScanRequest`: Filter parameters for bulk scan
- `CandidateResult`: Single stock result (score, signals, entry/stop/targets)
- `ScanResponse`: Paginated list of results
- `TickerSignal`: Debug view with all intermediate signals

**utils.py**
- Helper functions: `clamp()`, `clamp01()`, `config_hash()`, date parsing
- Shared utilities across modules

### Planned Modules (Not Yet Created)

**pipeline.py**
- Hard filters (H1–H5 criteria)
- Stage 2 classification logic
- Pattern detection (VCP, Flat Base, Darvas, Tight Flag)

**scoring.py**
- Composite scoring logic
- Strategy confluence (Minervini, Stine, Elder)
- Final rank score calculation
- Entry/stop/target derivation

### API Endpoints

- `POST /scan` — Full universe scan with optional filters
- `GET /ticker/{symbol}` — Single-stock analysis + debug signals
- `GET /health` — Service health check

## Key Architectural Patterns

1. **Dependency Injection**: Config passed to components, not fetched globally
2. **Immutable Signals**: Daily bars treated as immutable; new bars never overwrite
3. **Config-Driven**: All thresholds in `config.py`, no magic numbers in calculations
4. **Async I/O**: All network calls are async; blocking operations isolated
5. **Error Resilience**: Partial failures logged; only SPY or >20% universe failure causes hard stop

## Frontend Component Tree

```
App
├── Header (branding, filters)
├── ScanResults (table view)
│   └── [CandidateRow] (sortable columns)
└── TickerDetail (modal/detail page)
    ├── PatternBreakdown
    ├── StrategyConfluence
    └── SignalTimeline
```

## Data Flow

1. **Scan Request** → `POST /scan` → Backend
2. Backend fetches universe from Massive API (cached)
3. For each ticker: fetch daily bars (cached) → calculate indicators → apply hard filters → compute scores
4. Results ranked, filtered by strategy confluence
5. `ScanResponse` returned with top candidates
6. Frontend displays results table; user clicks row for `TickerDetail`
7. `GET /ticker/{symbol}` returns all intermediate signals for debugging
