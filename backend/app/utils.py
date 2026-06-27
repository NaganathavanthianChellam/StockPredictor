"""Utility functions and helpers."""
import hashlib
import json
import logging
from typing import Any, Dict, List, Optional
from datetime import datetime, timedelta
import numpy as np

logger = logging.getLogger(__name__)


def clamp(value: float, min_val: float = 0.0, max_val: float = 1.0) -> float:
    """Clamp value between min and max."""
    return max(min_val, min(max_val, value))


def clamp01(value: float) -> float:
    """Clamp value between 0 and 1."""
    return clamp(value, 0.0, 1.0)


def config_hash(config: Dict[str, Any]) -> str:
    """Generate SHA256 hash of config object."""
    config_str = json.dumps(config, sort_keys=True)
    return "sha256:" + hashlib.sha256(config_str.encode()).hexdigest()[:16]


def parse_date(date_str: str) -> datetime:
    """Parse YYYY-MM-DD to datetime."""
    return datetime.strptime(date_str, "%Y-%m-%d")


def format_date(dt: datetime) -> str:
    """Format datetime to YYYY-MM-DD."""
    return dt.strftime("%Y-%m-%d")


def is_trading_day(dt: datetime) -> bool:
    """Check if date is a US trading day (not weekend)."""
    # Simplified: weekday 0-4 = Mon-Fri
    # In production, check against US market holidays
    return dt.weekday() < 5


def get_prior_trading_day(dt: datetime, days_back: int = 1) -> datetime:
    """Get N trading days prior, skipping weekends."""
    current = dt
    count = 0
    while count < days_back:
        current -= timedelta(days=1)
        if is_trading_day(current):
            count += 1
    return current


def sma(prices: np.ndarray, window: int) -> np.ndarray:
    """Compute simple moving average."""
    if len(prices) < window:
        return np.full_like(prices, np.nan)
    return np.convolve(prices, np.ones(window) / window, mode="valid")


def ema(prices: np.ndarray, window: int) -> np.ndarray:
    """Compute exponential moving average."""
    if len(prices) < window:
        return np.full_like(prices, np.nan)
    
    multiplier = 2.0 / (window + 1)
    ema_values = np.full(len(prices), np.nan)
    
    # First EMA = SMA
    ema_values[window - 1] = np.mean(prices[:window])
    
    for i in range(window, len(prices)):
        ema_values[i] = prices[i] * multiplier + ema_values[i - 1] * (1 - multiplier)
    
    return ema_values


def atr(high: np.ndarray, low: np.ndarray, close: np.ndarray, window: int = 14) -> np.ndarray:
    """Compute Average True Range (Wilder's)."""
    if len(high) < window:
        return np.full_like(high, np.nan)
    
    # True Range
    tr1 = high - low
    tr2 = np.abs(high - np.roll(close, 1))
    tr3 = np.abs(low - np.roll(close, 1))
    tr = np.maximum(tr1, np.maximum(tr2, tr3))
    tr[0] = np.nan
    
    # Wilder's ATR
    atr_values = np.full(len(high), np.nan)
    atr_values[window - 1] = np.nanmean(tr[:window])
    
    for i in range(window, len(high)):
        atr_values[i] = (atr_values[i - 1] * (window - 1) + tr[i]) / window
    
    return atr_values


def macd(prices: np.ndarray, fast: int = 12, slow: int = 26, signal: int = 9) -> tuple:
    """Compute MACD, signal line, and histogram."""
    ema_fast = ema(prices, fast)
    ema_slow = ema(prices, slow)
    macd_line = ema_fast - ema_slow
    signal_line = ema(macd_line, signal)
    histogram = macd_line - signal_line
    return macd_line, signal_line, histogram


def rs_rank(stock_return: float, spy_return: float, universe_returns: List[float]) -> float:
    """Compute RS rank (percentile of stock vs SPY against universe)."""
    # stock_return and spy_return are typically 63-day returns
    # Simplified: rank stock's relative outperformance vs universe median
    if not universe_returns:
        return 50.0
    
    rs_diff = stock_return - spy_return
    universe_diffs = [ret - spy_return for ret in universe_returns]
    percentile = (sum(1 for d in universe_diffs if d < rs_diff) / len(universe_diffs)) * 100
    return min(100.0, max(0.0, percentile))


def percentile_rank(value: float, series: List[float]) -> float:
    """Compute percentile rank of value in series (0-100)."""
    if not series or len(series) == 0:
        return 50.0
    sorted_series = sorted(series)
    rank = sum(1 for v in sorted_series if v < value) / len(sorted_series) * 100
    return min(100.0, max(0.0, rank))


def log_calculation(component: str, value: Any, details: Optional[str] = None):
    """Log calculation for debugging."""
    if details:
        logger.debug(f"{component}: {value} ({details})")
    else:
        logger.debug(f"{component}: {value}")


def pct_change(current: float, prior: float) -> float:
    """Compute percentage change."""
    if prior == 0:
        return 0.0
    return (current - prior) / prior


def distance_pct(value: float, reference: float) -> float:
    """Compute distance as percentage of reference."""
    if reference == 0:
        return 0.0
    return (value - reference) / reference
