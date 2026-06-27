"""Configuration and thresholds for the scanning engine."""
import os
from typing import Dict, Any

# API Configuration
POLYGON_TOKEN = os.getenv("POLYGON_TOKEN", "")
MASSIVE_API_BASE = "https://api.massive.com"
API_TIMEOUT = 10
API_RETRIES = 3
MAX_CONCURRENT_REQUESTS = 5  # paid tier; reduce to 1 for free

# Scanning Parameters
DEFAULT_TOP_N = 20
DEFAULT_MIN_SCORE = 65
DEFAULT_MAX_PER_SECTOR = 3
CACHE_TTL_DAYS = 365
REQUEST_ID_CACHE_TTL_SECONDS = 60

# Hard Filter Thresholds (§8)
HARD_FILTER_THRESHOLDS = {
    "h1_min_close_above_sma200": True,  # strictly >
    "h2_min_distance_above_52w_low": 0.50,  # >= 50%
    "h3_max_distance_below_52w_high": 0.35,  # <= 35%
    "h4_no_close_below_sma50_bars": 5,  # last 5 sessions
    "h5_earnings_window_days": 10,  # not within next 10 days
}

# Stage 2 Classification (§9)
STAGE_2_THRESHOLDS = {
    "sma50_slope_min_pct": 0.003,  # +0.3%
    "sma200_slope_min_pct": 0.0,  # >= 0%
    "close_multiplier_52w_low": 1.30,
    "close_ratio_52w_high": 0.75,
}

# Liquidity & Universe Filters (§5)
LIQUIDITY_FILTERS = {
    "min_close_price": 10.0,
    "min_avg_dollar_volume_20d": 20_000_000,
    "min_ipo_age_trading_days": 150,
}

# Indicator Windows (§7, all in trading days unless -wk)
INDICATOR_WINDOWS = {
    "sma": [10, 20, 50, 150, 200],
    "ema_daily": 21,  # on SPY for regime
    "ema_weekly": 13,
    "macd_periods": (12, 26, 9),
    "volume_avg_window": 20,
    "rsi_window": 14,  # ATR(14)
    "rs_lookback": 63,  # 63-day RS rank
    "rmv15_window": 15,
    "rmv15_rank_window": 60,
    "bars_52w": 252,
    "ma_slope_window": 21,
}

# Scoring Weights (§11)
SCORING_WEIGHTS = {
    "volume": 0.40,
    "structure": 0.30,
    "pattern": 0.20,
    "rs": 0.10,
}

# Volume Subscore Components
VOLUME_SUBSCORE_CAPS = {
    "volume_trend": 15,
    "breakout_volume": 15,
    "base_dryup": 10,
}

# Structure Subscore
STRUCTURE_SUBSCORE_RULES = {
    "close_above_sma200": 10,
    "aligned_smas": 8,
    "ma_slope_rising": 7,  # split between SMA20/50/200 + SMA10
    "close_near_sma20_5pct": 5,
    "close_near_sma20_10pct": 3,
    "close_near_sma20_15pct": 1,
}

# Pattern Subscore (§10)
PATTERN_SUBSCORE_CAPS = {
    "confirmed_pattern": 12,
    "confidence_weight": 5,
    "confidence_threshold": 0.5,
    "confidence_points": 3,
}

# RS Subscore (§11)
RS_SUBSCORE_RULES = {
    "rs_rank_80_plus": 10,
    "rs_rank_70_plus": 7,
    "rs_rank_50_plus": 4,
}

# Signal Mapping
SIGNAL_MAP = {
    "buy": 70,
    "watch": 50,
}

# Extension/Chase Guardrail (§13)
EXTENSION_SEVERITY = {
    "5d_change_10pct": 1,
    "10d_change_15pct": 2,
    "close_10pct_above_sma20": 1,
    "close_15pct_above_sma50": 1,
    "close_5pct_above_pivot": 2,
}
EXTENSION_SEVERITY_THRESHOLD = 2
EXTENSION_SCORE_PENALTY = 20

# Market Regime (§14)
REGIME_BEARISH_MULTIPLIER = 0.65
REGIME_SPY_SYMBOL = "SPY"

# Final Ranking Score Weights (§15)
FINAL_SCORE_WEIGHTS = {
    "composite": 0.40,
    "minervini_pass_count": 0.20,
    "rmv15": 0.15,
    "rs_rank": 0.15,
    "elder_weekly": 0.10,
}

# Elder Weekly Points
ELDER_WEEKLY_POINTS = {
    "green": 100,
    "blue": 50,
    "red": 0,
}

# Entry/Stop/Target (§16)
ENTRY_STOP_PARAMS = {
    "entry_upper_multiplier": 1.02,
    "entry_lower_offset_pct": 0.001,
    "stop_atr_multiplier": 2.0,
    "stop_min_safety_pct": 0.999,
    "stop_max_safety_pct": 0.99,
    "max_risk_pct": 0.07,  # 7%
    "target_1_multiplier": 1.0,
    "target_2_multiplier": 1.5,
    "position_size_risk_pct": 0.01,  # 1% of account
}

# Portfolio Risk Management (§16)
PORTFOLIO_CAPS = {
    "max_cumulative_position_size_pct": 0.12,  # 12%
}

# Minervini Trend Template (§12.A)
MINERVINI_RULES = {
    "pass_count_threshold": 6,
    "pct_from_pivot_threshold": 0.05,
    "min_composite_score": 60,
}

# Stine 30-Week Superstock (§12.B)
STINE_RULES = {
    "high_52w_distance_pct": 0.25,
}

# VCP Pattern (§10)
VCP_RULES = {
    "min_bars": 30,
    "max_contractions": 3,
    "min_contraction_depth": 0.10,
    "max_contraction_ratio": 0.50,
    "confirmed_volume_multiplier": 2.0,
    "confidence_components": {
        "contractions": 0.40,
        "volume_quality": 0.30,
        "recency": 0.30,
    },
}

# Flat Base Pattern (§10)
FLAT_BASE_RULES = {
    "min_bars": 20,
    "max_bars": 120,
    "max_range_pct": 0.15,
    "confirmed_volume_multiplier": 1.5,
    "confidence_components": {
        "tightness": 0.50,
        "volume_dryup": 0.30,
        "duration": 0.20,
    },
}

# Darvas Box Pattern (§10)
DARVAS_RULES = {
    "min_prior_advance_pct": 0.08,
    "min_box_bars": 3,
    "max_box_bars": 40,
    "min_box_depth_pct": 0.01,
    "max_box_depth_pct": 0.15,
    "confirmed_volume_multiplier": 1.5,
    "confidence_components": {
        "depth": 0.50,
        "volume_decline": 0.50,
    },
}

# Tight Flag Pattern (§10)
TIGHT_FLAG_RULES = {
    "min_flagpole_pct": 0.08,
    "flagpole_lookback_bars": 15,
    "max_retrace_pct": 0.50,
    "max_flag_bars": 20,
    "confirmed_volume_multiplier": 1.5,
    "confidence_components": {
        "pole_strength": 0.40,
        "retrace": 0.30,
        "flag_duration": 0.30,
    },
}

# Pattern Detection Minimum Confidence
PATTERN_MIN_CONFIDENCE = 0.4

# Data Lookback (§6)
DAILY_BARS_LOOKBACK_CALENDAR_DAYS = 430
UNIVERSE_SPY_LOOKBACK_YEARS = 1

# Partial Failure Policy (§2)
PARTIAL_FAILURE_THRESHOLD = 0.20  # 20%

# Acceptance Criteria
MAX_SCAN_TIME_SECONDS = 120
MAX_SCAN_TIME_COLD_CACHE_SECONDS = 120


def get_config() -> Dict[str, Any]:
    """Return full config object for hashing and serialization."""
    return {
        "hard_filters": HARD_FILTER_THRESHOLDS,
        "stage_2": STAGE_2_THRESHOLDS,
        "liquidity": LIQUIDITY_FILTERS,
        "indicators": INDICATOR_WINDOWS,
        "scoring": {
            "weights": SCORING_WEIGHTS,
            "volume_subscore": VOLUME_SUBSCORE_CAPS,
            "structure_subscore": STRUCTURE_SUBSCORE_RULES,
            "pattern_subscore": PATTERN_SUBSCORE_CAPS,
            "rs_subscore": RS_SUBSCORE_RULES,
            "signal_map": SIGNAL_MAP,
        },
        "extension": EXTENSION_SEVERITY,
        "regime": REGIME_BEARISH_MULTIPLIER,
        "final_score_weights": FINAL_SCORE_WEIGHTS,
        "entry_stop": ENTRY_STOP_PARAMS,
        "portfolio": PORTFOLIO_CAPS,
        "minervini": MINERVINI_RULES,
        "stine": STINE_RULES,
        "patterns": {
            "vcp": VCP_RULES,
            "flat_base": FLAT_BASE_RULES,
            "darvas": DARVAS_RULES,
            "tight_flag": TIGHT_FLAG_RULES,
        },
    }
