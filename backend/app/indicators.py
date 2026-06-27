"""Indicator calculations (SMA, EMA, MACD, ATR, RS rank, RMV15, etc.)."""
import numpy as np
import logging
from typing import List, Dict, Any, Tuple, Optional
from app import utils
from app.config import INDICATOR_WINDOWS

logger = logging.getLogger(__name__)


class IndicatorCalculator:
    """Compute all indicators per spec §7."""
    
    def __init__(self, daily_bars: List[Dict[str, Any]]):
        """Initialize with daily OHLCV bars."""
        self.bars = daily_bars
        self.dates = np.array([b["date"] for b in daily_bars])
        self.opens = np.array([b["open"] for b in daily_bars])
        self.highs = np.array([b["high"] for b in daily_bars])
        self.lows = np.array([b["low"] for b in daily_bars])
        self.closes = np.array([b["close"] for b in daily_bars])
        self.volumes = np.array([b["volume"] for b in daily_bars])
        
        self.indicators = {}
    
    def compute_all(self) -> Dict[str, Any]:
        """Compute all required indicators."""
        self.indicators = {
            "smas": self._compute_smas(),
            "emas": self._compute_emas(),
            "macd": self._compute_macd(),
            "volume_avg": self._compute_volume_avg(),
            "rvol": self._compute_rvol(),
            "highs_52w": self._compute_52w_high_low(),
            "atr_14": self._compute_atr(),
            "ma_slopes": self._compute_ma_slopes(),
        }
        return self.indicators
    
    def _compute_smas(self) -> Dict[int, np.ndarray]:
        """Compute SMAs: 10, 20, 50, 150, 200."""
        smas = {}
        for window in INDICATOR_WINDOWS["sma"]:
            smas[window] = utils.sma(self.closes, window)
        return smas
    
    def _compute_emas(self) -> Dict[str, np.ndarray]:
        """Compute EMAs: 13-week (weekly), 21-day (SPY only here for reference)."""
        emas = {}
        # 21-day EMA for regime (SPY)
        emas["ema21"] = utils.ema(self.closes, INDICATOR_WINDOWS["ema_daily"])
        return emas
    
    def _compute_macd(self) -> Dict[str, np.ndarray]:
        """Compute MACD (12/26/9)."""
        fast, slow, signal = INDICATOR_WINDOWS["macd_periods"]
        macd_line, signal_line, histogram = utils.macd(
            self.closes, fast=fast, slow=slow, signal=signal
        )
        return {
            "macd": macd_line,
            "signal": signal_line,
            "histogram": histogram,
        }
    
    def _compute_volume_avg(self) -> np.ndarray:
        """Compute 20-day rolling average volume."""
        window = INDICATOR_WINDOWS["volume_avg_window"]
        vol_avg = np.convolve(self.volumes, np.ones(window) / window, mode="valid")
        # Pad to match length
        result = np.full_like(self.volumes, np.nan, dtype=float)
        result[window - 1:] = vol_avg
        return result
    
    def _compute_rvol(self) -> np.ndarray:
        """Compute Relative Volume (today's volume / 20-day avg)."""
        vol_avg = self._compute_volume_avg()
        rvol = self.volumes / vol_avg
        rvol[np.isnan(vol_avg)] = np.nan
        return rvol
    
    def _compute_52w_high_low(self) -> Dict[str, np.ndarray]:
        """Compute rolling 52-week (252 trading days) high and low."""
        window = INDICATOR_WINDOWS["bars_52w"]
        
        highs_52w = np.full_like(self.closes, np.nan)
        lows_52w = np.full_like(self.closes, np.nan)
        
        for i in range(window - 1, len(self.closes)):
            highs_52w[i] = np.max(self.highs[i - window + 1 : i + 1])
            lows_52w[i] = np.min(self.lows[i - window + 1 : i + 1])
        
        return {"high": highs_52w, "low": lows_52w}
    
    def _compute_atr(self) -> np.ndarray:
        """Compute ATR(14)."""
        return utils.atr(self.highs, self.lows, self.closes, window=14)
    
    def _compute_ma_slopes(self) -> Dict[int, float]:
        """Compute MA slopes: (MA_today - MA_21_bars_ago) / MA_21_bars_ago."""
        slopes = {}
        smas = self._compute_smas()
        window_lookback = INDICATOR_WINDOWS["ma_slope_window"]
        
        if len(self.closes) < window_lookback:
            return slopes
        
        for ma_window in INDICATOR_WINDOWS["sma"]:
            sma_values = smas[ma_window]
            if len(sma_values) >= window_lookback:
                today_ma = sma_values[-1]
                prior_ma = sma_values[-window_lookback]
                if not np.isnan(today_ma) and not np.isnan(prior_ma) and prior_ma != 0:
                    slope = (today_ma - prior_ma) / prior_ma
                    slopes[ma_window] = slope
        
        return slopes
    
    def get_current(self, indicator_name: str, offset: int = 0) -> float:
        """Get current value of indicator (offset=0 for most recent, 1 for prior bar, etc.)."""
        if indicator_name == "close":
            return self.closes[-1 - offset] if len(self.closes) > offset else np.nan
        
        if indicator_name not in self.indicators:
            self.compute_all()
        
        indicators = self.indicators
        
        if indicator_name.startswith("sma"):
            window = int(indicator_name.split("_")[1])
            arr = indicators["smas"].get(window)
        elif indicator_name.startswith("ema"):
            arr = indicators["emas"].get(indicator_name)
        elif indicator_name.startswith("macd"):
            arr = indicators["macd"].get(indicator_name.split("_")[1])
        elif indicator_name == "volume_avg":
            arr = indicators["volume_avg"]
        elif indicator_name == "rvol":
            arr = indicators["rvol"]
        elif indicator_name.startswith("high_52w"):
            arr = indicators["highs_52w"]["high"]
        elif indicator_name.startswith("low_52w"):
            arr = indicators["highs_52w"]["low"]
        elif indicator_name == "atr_14":
            arr = indicators["atr_14"]
        else:
            return np.nan
        
        if arr is not None and len(arr) > offset:
            return arr[-1 - offset]
        return np.nan
    
    def get_series(self, indicator_name: str, lookback: int) -> np.ndarray:
        """Get lookback series of indicator values."""
        if indicator_name == "close":
            return self.closes[-lookback:]
        
        if indicator_name not in self.indicators:
            self.compute_all()
        
        indicators = self.indicators
        
        if indicator_name.startswith("sma"):
            window = int(indicator_name.split("_")[1])
            arr = indicators["smas"].get(window)
        elif indicator_name.startswith("volume_avg"):
            arr = indicators["volume_avg"]
        else:
            return np.array([])
        
        if arr is not None:
            return arr[-lookback:]
        return np.array([])


def compute_rmv15(daily_bars: List[Dict[str, Any]]) -> Tuple[float, float]:
    """
    Compute RMV15: rolling 15-bar stdev of daily log returns, 
    percentile-ranked against this ticker's own prior 60 bars of stdev values.
    
    Returns: (rmv15_value, rmv15_percentile)
    """
    if len(daily_bars) < 15 + 60:
        return np.nan, np.nan
    
    closes = np.array([b["close"] for b in daily_bars])
    log_returns = np.diff(np.log(closes))
    
    # Compute rolling 15-bar stdev
    window = 15
    stdev_values = []
    for i in range(window, len(log_returns) + 1):
        stdev = np.std(log_returns[i - window : i])
        stdev_values.append(stdev)
    
    if len(stdev_values) < 60 + 1:
        return np.nan, np.nan
    
    # Current stdev (today's 15-bar stdev)
    current_stdev = stdev_values[-1]
    
    # Prior 60 stdev values
    prior_stdevs = stdev_values[-61:-1]  # 60 prior bars
    
    # Percentile rank
    percentile = utils.percentile_rank(current_stdev, prior_stdevs)
    
    return current_stdev, percentile
