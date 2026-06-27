# StockPredictor Spec

## Overview
A 30-day bullish stock scanner built with FastAPI backend and React frontend. Analyzes tickers using technical analysis rules to identify the most promising breakout candidates.

**Timeline:** 2 hours  
**Scope:** MVP with core scanning logic + minimal frontend

---

## Architecture

### Backend: FastAPI
- `POST /scan` — full universe scan with configurable filters
- `GET /ticker/{symbol}` — single-stock pipeline for debugging
- `GET /health` — service health check
- Rate limiting, caching, and resilient API integration with Massive/Polygon

### Frontend: React + Tailwind CSS
- Minimal, clean UI inspired by professional platforms (Amazon/Google aesthetic)
- Scan results table with sortable columns
- Single-ticker deep-dive view
- Real-time status indicators

### Data: Massive REST API
- Authentication via `POLYGON_TOKEN` environment variable
- Daily bar caching with TTL logic
- Concurrent request batching (5 per second for paid plans)

---

## 2-Hour Implementation Plan

### Hour 1: Backend Core
1. **Project setup** (5 min)
   - FastAPI scaffold, requirements.txt, config
   - Environment & logging

2. **Data layer** (15 min)
   - Massive API client with retry/backoff
   - Bar cache (in-memory + optional SQLite for persistence)
   - Universe builder (liquidity + IPO filters)

3. **Indicator & pipeline core** (25 min)
   - SMA, EMA, MACD, ATR, RS rank, RMV15
   - Hard filters (H1–H5)
   - Stage 2 classification
   - Pattern detection (VCP, Flat Base, Darvas, Tight Flag)

4. **Scoring & ranking** (10 min)
   - Composite score (Phoenix-style)
   - Strategy confluence (Minervini, Stine, Elder)
   - Final rank score

5. **Endpoints** (5 min)
   - `/scan`, `/ticker/{symbol}`, `/health` with response schemas

### Hour 2: Frontend & Integration
1. **React setup** (5 min)
   - Create React app with Tailwind CSS
   - Component structure

2. **Results table** (10 min)
   - Display top candidates, sortable columns
   - Key metrics (score, signal, entry/stop/targets)

3. **Single-ticker view** (10 min)
   - All intermediate signals for debugging
   - Pattern details, strategy breakdowns

4. **Backend integration & polish** (15 min)
   - API calls from React
   - Error handling & loading states
   - Format results for readability

5. **Testing & deployment notes** (10 min)
   - Basic smoke tests
   - Docker setup (optional quick reference)

---

## Deferred to v2 (2+ hours)
- Backtest harness (mode="backtest")
- Post-rank screening hook (halal/ESG)
- Advanced portfolio optimization
- Walk-forward validation
- Full earnings data integration (mock for MVP)
- Persistent scan history (use JSON files for now)

---

## Acceptance Criteria (MVP)
- [x] `POST /scan` completes in < 120s on 50 tickers with cold cache
- [x] Hard filters, stage 2, pattern detection working
- [x] Composite + final ranking scores computed
- [x] Strategy confluence (≥2 of 3) enforced
- [x] Entry/stop/targets calculated per spec
- [x] React frontend displays results
- [x] `/ticker/{symbol}` exposes debug signals
- [ ] Full 500-ticker universe (time-limited, will use sample universe for MVP)
- [ ] Backtest mode (deferred)
- [ ] Persistent scan cache (in-memory for MVP)

---

## File Structure
```
StockPredictor/
├── backend/
│   ├── app/
│   │   ├── main.py                 # FastAPI app, endpoints
│   │   ├── config.py               # Config object, thresholds
│   │   ├── client.py               # Massive API client
│   │   ├── cache.py                # Bar & universe cache
│   │   ├── indicators.py           # SMA, EMA, MACD, ATR, RS, RMV15
│   │   ├── pipeline.py             # Hard filters, stage 2, patterns
│   │   ├── scoring.py              # Composite & final scoring
│   │   ├── models.py               # Pydantic schemas
│   │   └── utils.py                # Helpers (clamp, date math, etc.)
│   ├── requirements.txt
│   ├── .env.example
│   └── run.py                      # Entry point
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   ├── ScanResults.tsx
│   │   │   ├── TickerDetail.tsx
│   │   │   └── Header.tsx
│   │   ├── hooks/
│   │   │   └── useApi.ts
│   │   └── index.css               # Tailwind
│   ├── package.json
│   └── index.html
└── README.md
```

---

## Notes for Implementation
1. **No-look-ahead:** All indicator windows respect `as_of` boundary
2. **Config-driven:** All thresholds loaded from `config.scoring.*`
3. **Caching:** Daily bars cached forever; current-session bars expire at midnight ET
4. **Concurrency:** Request batching capped at 5 concurrent
5. **Error resilience:** Partial failures allowed; hard fail only if SPY or >20% of universe fails

