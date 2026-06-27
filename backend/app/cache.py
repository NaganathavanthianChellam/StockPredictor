"""In-memory caching for bars and universe."""
import logging
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
from app import utils

logger = logging.getLogger(__name__)


class BarCache:
    """In-memory cache for daily bars keyed by (ticker, date)."""
    
    def __init__(self):
        self.cache = {}  # (ticker, date) -> bar_data
        self.ticker_last_update = {}  # ticker -> last_date_cached
    
    def get(self, ticker: str, date: str) -> Optional[Dict[str, Any]]:
        """Get bar for ticker on date."""
        return self.cache.get((ticker, date))
    
    def get_range(self, ticker: str, from_date: str, to_date: str) -> List[Dict[str, Any]]:
        """Get all bars for ticker in date range (cached only)."""
        result = []
        current = utils.parse_date(from_date)
        end = utils.parse_date(to_date)
        
        while current <= end:
            date_str = utils.format_date(current)
            bar = self.cache.get((ticker, date_str))
            if bar:
                result.append(bar)
            current += timedelta(days=1)
        
        return result
    
    def put(self, ticker: str, bars: List[Dict[str, Any]]):
        """Cache bars for ticker."""
        for bar in bars:
            self.cache[(ticker, bar["date"])] = bar
        
        if bars:
            latest_date = bars[-1]["date"]
            self.ticker_last_update[ticker] = latest_date
    
    def get_last_cached_date(self, ticker: str) -> Optional[str]:
        """Get most recent cached date for ticker."""
        return self.ticker_last_update.get(ticker)
    
    def clear(self):
        """Clear all cache."""
        self.cache.clear()
        self.ticker_last_update.clear()


class UniverseCache:
    """Cache for qualified universe (tickers passing liquidity filters)."""
    
    def __init__(self):
        self.cache = None
        self.last_update = None
    
    def get(self, as_of: str) -> Optional[List[str]]:
        """Get cached universe for date."""
        # For MVP, return same universe regardless of date
        # In production, need point-in-time universe for backtest mode
        return self.cache
    
    def put(self, as_of: str, tickers: List[str]):
        """Cache universe for date."""
        self.cache = tickers
        self.last_update = as_of
    
    def is_stale(self, days: int = 1) -> bool:
        """Check if cache is stale."""
        if not self.last_update:
            return True
        
        last_update_dt = utils.parse_date(self.last_update)
        now = datetime.now()
        return (now - last_update_dt).days >= days


class RequestCache:
    """Cache scan results by request_id for deduplication."""
    
    def __init__(self, ttl_seconds: int = 60):
        self.cache = {}  # request_id -> (scan_result, timestamp)
        self.ttl = ttl_seconds
    
    def get(self, request_id: str) -> Optional[Dict[str, Any]]:
        """Get cached scan result if still valid."""
        if request_id not in self.cache:
            return None
        
        result, timestamp = self.cache[request_id]
        if (datetime.now() - timestamp).total_seconds() > self.ttl:
            del self.cache[request_id]
            return None
        
        return result
    
    def put(self, request_id: str, scan_result: Dict[str, Any]):
        """Cache scan result."""
        self.cache[request_id] = (scan_result, datetime.now())
    
    def clear_expired(self):
        """Remove expired entries."""
        now = datetime.now()
        expired = [
            rid for rid, (_, ts) in self.cache.items()
            if (now - ts).total_seconds() > self.ttl
        ]
        for rid in expired:
            del self.cache[rid]


# Global cache instances
bar_cache = BarCache()
universe_cache = UniverseCache()
request_cache = RequestCache(ttl_seconds=60)
