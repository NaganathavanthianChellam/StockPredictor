"""Massive/Polygon API client with retry and caching logic."""
import httpx
import logging
import asyncio
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
from app.config import (
    POLYGON_TOKEN, MASSIVE_API_BASE, API_TIMEOUT, API_RETRIES, MAX_CONCURRENT_REQUESTS
)
from app import utils

logger = logging.getLogger(__name__)


class MassiveClient:
    """Polygon/Massive REST API client with retry and concurrency control."""
    
    def __init__(self):
        self.base_url = MASSIVE_API_BASE
        self.token = POLYGON_TOKEN
        self.timeout = API_TIMEOUT
        self.max_retries = API_RETRIES
        self.semaphore = asyncio.Semaphore(MAX_CONCURRENT_REQUESTS)
        self.api_calls_used = 0
    
    async def _request(self, endpoint: str, params: Optional[Dict] = None) -> Dict[str, Any]:
        """Make authenticated request to Massive API with retry logic."""
        async with self.semaphore:
            url = f"{self.base_url}{endpoint}"
            headers = {"Authorization": f"Bearer {self.token}"}
            
            for attempt in range(self.max_retries):
                try:
                    async with httpx.AsyncClient(timeout=self.timeout) as client:
                        response = await client.get(url, headers=headers, params=params)
                        self.api_calls_used += 1
                        
                        if response.status_code == 429:
                            # Rate limit: exponential backoff
                            backoff = 2 ** attempt
                            logger.warning(f"Rate limited, backing off {backoff}s")
                            await asyncio.sleep(backoff)
                            continue
                        
                        response.raise_for_status()
                        return response.json()
                
                except httpx.TimeoutException:
                    if attempt < self.max_retries - 1:
                        backoff = 2 ** attempt
                        logger.warning(f"Timeout, retrying in {backoff}s")
                        await asyncio.sleep(backoff)
                        continue
                    raise
                except httpx.HTTPError as e:
                    logger.error(f"HTTP error: {e}")
                    raise
            
            raise Exception(f"Max retries exceeded for {endpoint}")
    
    async def get_universe(self, limit: int = 1000) -> List[Dict[str, Any]]:
        """Fetch active US common stocks."""
        endpoint = "/v3/reference/tickers"
        params = {
            "market": "stocks",
            "type": "CS",
            "active": True,
            "limit": limit,
        }
        result = await self._request(endpoint, params)
        return result.get("results", [])
    
    async def get_daily_bars(
        self, ticker: str, from_date: str, to_date: str, adjusted: bool = True
    ) -> List[Dict[str, Any]]:
        """Fetch daily bars for ticker."""
        endpoint = f"/v2/aggs/ticker/{ticker}/range/1/day/{from_date}/{to_date}"
        params = {
            "adjusted": adjusted,
            "sort": "asc",
            "limit": 50000,
        }
        result = await self._request(endpoint, params)
        bars = result.get("results", [])
        
        # Normalize to standard format
        normalized = []
        for bar in bars:
            normalized.append({
                "date": utils.format_date(datetime.fromtimestamp(bar["t"] / 1000)),
                "open": bar["o"],
                "high": bar["h"],
                "low": bar["l"],
                "close": bar["c"],
                "volume": bar["v"],
            })
        
        return normalized
    
    async def get_grouped_daily(self, date: str) -> List[Dict[str, Any]]:
        """Fetch grouped daily for all tickers on a date."""
        endpoint = f"/v2/aggs/grouped/locale/us/market/stocks/{date}"
        params = {"adjusted": True}
        result = await self._request(endpoint, params)
        return result.get("results", [])


# Sync wrapper for easier use in FastAPI
def get_client() -> MassiveClient:
    """Return singleton Massive API client."""
    return MassiveClient()
