"""Pydantic models for request/response schemas."""
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime


class ScanRequest(BaseModel):
    """POST /scan request body."""
    stocks: List[str] = Field(default_factory=list, description="List of stock symbols to analyze")
    as_of: Optional[str] = Field(None, description="YYYY-MM-DD, default: latest closed trading day")
    top_n: int = Field(20, ge=1, le=500)
    min_score: int = Field(65, ge=0, le=100)
    max_per_sector: int = Field(3, ge=1)
    exclude: List[str] = Field(default_factory=list)
    request_id: Optional[str] = None
    mode: str = Field("live", pattern="^(live|backtest)$")
    dry_run: bool = False


class PatternDetail(BaseModel):
    """Pattern detection details."""
    name: str  # VCP, Flat Base, Darvas, Tight Flag
    confirmed: bool
    confidence: float = Field(..., ge=0, le=1)
    pivot: float
    base_height: float


class CandidateResult(BaseModel):
    """Single candidate in scan results."""
    symbol: str
    sector: str
    signal: str  # BUY, WATCH, AVOID
    final_score: float
    composite_score: float
    stage: int  # 2 for all valid candidates
    pattern: Optional[PatternDetail] = None
    strategies_passing: List[str]  # minervini, stine, elder_weekly
    minervini_pass_count: int
    rs_rank: float
    rmv15: float
    rvol_today: float
    atr_14: float
    extension_severity: int
    chasing: bool
    entry_zone: List[float]  # [lower, upper]
    stop: float
    risk_pct: float
    target_1: float
    target_2: float
    position_size_hint_pct_account: float
    thesis: str


class ScanResponse(BaseModel):
    """POST /scan response."""
    scan_id: str
    as_of: str
    horizon_days: int = 30
    config_hash: str
    market_regime: str  # risk_on, risk_off
    spy_close: float
    spy_ema21: float
    universe_size_after_liquidity: int
    candidates_passing_all_gates: int
    candidates_returned: int
    api_calls_used: int
    results: List[CandidateResult]


class TickerSignal(BaseModel):
    """Debug signals for GET /ticker/{symbol}."""
    symbol: str
    as_of: str
    close: float
    stage: int
    signal: str
    hard_filter_failures: List[str]  # list of failed hard filter codes
    composite_score: float
    final_score: float
    pattern: Optional[PatternDetail]
    minervini_pass_count: int
    minervini_details: Dict[str, Any]
    stine_details: Dict[str, Any]
    elder_weekly: str  # GREEN, BLUE, RED
    extension_severity: int
    chasing: bool
    entry_zone: Optional[List[float]]
    stop: Optional[float]
    target_1: Optional[float]
    target_2: Optional[float]
    thesis: str


class HealthResponse(BaseModel):
    """GET /health response."""
    status: str
    as_of: str
    timestamp: datetime


class ErrorResponse(BaseModel):
    """Error response (all non-2xx)."""
    error_code: str
    message: str
    request_id: Optional[str] = None
    partial_results_available: bool = False
    details: Optional[Dict[str, Any]] = None
