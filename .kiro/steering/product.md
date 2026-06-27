# StockPredictor Product Overview

## Purpose
A 30-day bullish stock scanner that analyzes market tickers using technical analysis to identify promising breakout candidates. Uses a composite scoring system combining multiple trading strategies (Minervini, Stine, Elder) with pattern detection.

## Core Features
- **Universal Scanning**: Analyzes tickers with configurable liquidity and IPO filters
- **Technical Analysis**: SMA, EMA, MACD, ATR, RS rank, RMV15 indicators
- **Pattern Detection**: VCP, Flat Base, Darvas, Tight Flag patterns
- **Multi-Strategy Scoring**: Confluence rules requiring ≥2 of 3 strategies
- **Single-Ticker Analysis**: Deep-dive debugging view for individual stocks
- **Entry/Stop/Target Calculation**: Risk/reward-based position sizing

## Current Scope (MVP)
- FastAPI backend with configurable filters and caching
- React frontend with results table and single-ticker detail view
- Support for 50-ticker sample universe (scalable architecture)
- In-memory bar caching with optional persistence
- Resilient API integration with rate limiting and retry logic

## Deferred Features (v2+)
- Backtest harness
- Post-rank screening (halal/ESG)
- Portfolio optimization
- Walk-forward validation
- Persistent scan history
- Full 500-ticker universe

## Key Principles
1. **No look-ahead bias**: All indicators respect temporal boundaries
2. **Config-driven**: Thresholds managed centrally, not hardcoded
3. **Resilient**: Partial failures allowed; only fail if SPY or >20% of universe fails
4. **Performance**: Scan should complete in <120s on 50 tickers with cold cache
