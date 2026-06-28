"""FastAPI application for StockPredictor."""
import logging
import os
from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import (
    ScanRequest,
    ScanResponse,
    CandidateResult,
    TickerSignal,
    HealthResponse,
    ErrorResponse,
    PatternDetail,
)
from .config import get_config
from .utils import config_hash
import uuid

# Configure logging
logger = logging.getLogger(__name__)

# Verify environment setup
if not os.getenv("POLYGON_TOKEN"):
    logger.warning("POLYGON_TOKEN not set in environment. API calls will fail.")

# Create FastAPI app
app = FastAPI(
    title="StockPredictor API",
    description="30-day bullish stock scanner with technical analysis",
    version="1.0.0",
    docs_url="/docs",
    openapi_url="/openapi.json",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", response_model=HealthResponse)
async def health():
    """Service health check."""
    logger.info("Health check requested")
    return HealthResponse(
        status="ok",
        as_of=datetime.now().isoformat(),
        timestamp=datetime.now(),
    )


@app.post("/scan", response_model=ScanResponse)
async def scan(request: ScanRequest):
    """
    Full universe scan with configurable filters.
    
    Returns top candidates sorted by final score.
    """
    scan_id = request.request_id or str(uuid.uuid4())
    logger.info(f"Scan requested: {scan_id} with {len(request.stocks) if hasattr(request, 'stocks') else 0} stocks")
    
    try:
        config = get_config()
        config_hash_val = config_hash(config)
        
        # Mock implementation with sample data for demo
        # TODO: Implement full scan pipeline when pipeline.py and scoring.py are ready
        
        import random
        from datetime import datetime
        
        # Get stocks from request or use defaults
        stock_symbols = request.stocks if request.stocks else ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC']
        
        mock_results = []
        for symbol in stock_symbols[:10]:  # Limit to 10 for demo
            # Generate mock data
            base_price = random.uniform(500, 3000)
            score = random.uniform(60, 95)
            signal = 'BUY' if score >= 75 else 'WATCH' if score >= 60 else 'AVOID'
            
            entry_low = base_price * 0.98
            entry_high = base_price * 1.02
            stop = entry_low * 0.93
            target1 = entry_high * 1.15
            target2 = entry_high * 1.30
            risk_pct = ((entry_low - stop) / entry_low) * 100
            
            result = CandidateResult(
                symbol=symbol,
                sector=random.choice(['IT', 'Banking', 'Energy', 'FMCG', 'Auto']),
                signal=signal,
                final_score=score,
                composite_score=score * 0.9,
                stage=2,
                pattern=PatternDetail(
                    name=random.choice(['VCP', 'Flat Base', 'Darvas', 'Tight Flag']),
                    confirmed=True,
                    confidence=random.uniform(0.7, 0.95),
                    pivot=base_price * 1.05,
                    base_height=base_price * 0.15
                ) if random.random() > 0.3 else None,
                strategies_passing=['minervini', 'stine'] if score >= 75 else ['minervini'],
                minervini_pass_count=random.randint(6, 8),
                rs_rank=random.uniform(70, 95),
                rmv15=random.uniform(1.2, 2.5),
                rvol_today=random.uniform(1.1, 2.8),
                atr_14=base_price * 0.02,
                extension_severity=random.randint(0, 2),
                chasing=score < 70,
                entry_zone=[entry_low, entry_high],
                stop=stop,
                risk_pct=risk_pct,
                target_1=target1,
                target_2=target2,
                position_size_hint_pct_account=min(10.0, 100.0 / risk_pct),
                thesis=f"Strong technical setup for {symbol} with good momentum and relative strength. "
                       f"{'Confirmed pattern breakout with volume. ' if score >= 75 else 'Watch for entry signal. '}"
                       f"Risk/reward ratio of 1:{((target1 - entry_low) / (entry_low - stop)):.1f}."
            )
            mock_results.append(result)
        
        # Sort by score
        mock_results.sort(key=lambda x: x.final_score, reverse=True)
        
        logger.info(f"Scan complete: {len(mock_results)} results (MOCK DATA)")
        
        return ScanResponse(
            scan_id=scan_id,
            as_of=request.as_of or datetime.now().strftime("%Y-%m-%d"),
            horizon_days=30,
            config_hash=config_hash_val,
            market_regime="risk_on",
            spy_close=450.25,
            spy_ema21=448.50,
            universe_size_after_liquidity=len(stock_symbols),
            candidates_passing_all_gates=len(mock_results),
            candidates_returned=len(mock_results),
            api_calls_used=len(stock_symbols),
            results=mock_results,
        )
    except Exception as e:
        logger.error(f"Scan failed: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "error_code": "SCAN_FAILED",
                "message": str(e),
                "request_id": scan_id,
            },
        )


@app.get("/ticker/{symbol}", response_model=TickerSignal)
async def ticker_detail(symbol: str, as_of: str = None):
    """
    Single-ticker analysis with debug signals.
    
    Returns all intermediate signals for a specific ticker.
    """
    logger.info(f"Ticker detail requested: {symbol}")
    
    try:
        # TODO: Implement single-ticker pipeline
        # 1. Fetch daily bars for ticker
        # 2. Calculate all indicators
        # 3. Apply hard filters
        # 4. Calculate scores
        # 5. Detect patterns
        # 6. Return full signal breakdown
        
        logger.warning("Ticker pipeline not yet implemented - returning placeholder")
        
        return TickerSignal(
            symbol=symbol,
            as_of=as_of or datetime.now().strftime("%Y-%m-%d"),
            close=0.0,
            stage=0,
            signal="AVOID",
            hard_filter_failures=["NOT_IMPLEMENTED"],
            composite_score=0.0,
            final_score=0.0,
            pattern=None,
            minervini_pass_count=0,
            minervini_details={},
            stine_details={},
            elder_weekly="RED",
            extension_severity=0,
            chasing=False,
            entry_zone=None,
            stop=None,
            target_1=None,
            target_2=None,
            thesis="Pipeline not yet implemented",
        )
    except Exception as e:
        logger.error(f"Ticker detail failed: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "error_code": "TICKER_FAILED",
                "message": str(e),
            },
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
