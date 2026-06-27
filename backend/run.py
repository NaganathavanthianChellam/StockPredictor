#!/usr/bin/env python
"""Entry point to run the StockPredictor FastAPI server."""
import sys
import os
from pathlib import Path

# Add parent directory to path so app module can be imported
sys.path.insert(0, str(Path(__file__).parent))

# Load environment variables from .env file
from dotenv import load_dotenv
load_dotenv()

import uvicorn
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

if __name__ == "__main__":
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    reload = os.getenv("RELOAD", "true").lower() == "true"
    log_level = os.getenv("LOG_LEVEL", "info").lower()
    
    logger.info(f"Starting StockPredictor API...")
    logger.info(f"Host: {host}:{port}")
    logger.info(f"Reload: {reload}")
    logger.info(f"Log Level: {log_level}")
    
    try:
        uvicorn.run(
            "app.main:app",
            host=host,
            port=port,
            reload=reload,
            log_level=log_level,
        )
    except Exception as e:
        logger.error(f"Failed to start server: {e}")
        sys.exit(1)
