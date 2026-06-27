# Tech Stack & Build System

## Backend Stack
- **Framework**: FastAPI 0.104.1
- **Server**: Uvicorn 0.24.0
- **HTTP Client**: httpx 0.25.2
- **Data Validation**: Pydantic 2.5.0
- **Data Processing**: pandas 2.1.3, numpy 1.26.2
- **Configuration**: python-dotenv 1.0.0
- **Python Version**: 3.9+ (recommended 3.11+)

## Frontend Stack
- **Framework**: React + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Create React App or Vite (not yet specified)

## External APIs
- **Massive REST API**: Primary data source for daily bars and universe
- **Authentication**: `POLYGON_TOKEN` environment variable
- **Rate Limits**: 5 concurrent requests per second for paid plans

## Build & Development Commands

### Backend
```bash
# Install dependencies
pip install -r backend/requirements.txt

# Run development server
python backend/run.py

# Or with uvicorn directly
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend
```bash
# Install dependencies
npm install

# Run development server
npm start

# Build for production
npm run build
```

## Environment Configuration
- Use `.env` file for secrets (see `.env.example`)
- Required: `POLYGON_TOKEN` for API authentication
- Optional: `CACHE_PERSISTENCE`, log level settings, port configuration

## Code Style & Conventions
- **Python**: PEP 8 compliant
- **Type Hints**: Fully typed with Pydantic models for API contracts
- **Async/Await**: Used for I/O-bound operations (API calls, file operations)
- **Error Handling**: Graceful degradation; partial failures logged but not fatal
- **Logging**: Structured logging with timestamps and severity levels

## Testing Strategy
- **Unit Tests**: Test individual indicators and scoring functions
- **Integration Tests**: Validate full pipeline with sample data
- **Smoke Tests**: Verify endpoints respond correctly
- **Load Testing**: Monitor scan performance on 50+ tickers

## Deployment
- Docker containerization available (quick reference provided in spec)
- Environment-based configuration for staging/production
- Health check endpoint: `GET /health`

## Documentation
- API responses use Pydantic models (auto-generated OpenAPI docs at `/docs`)
- All config thresholds documented in `app/config.py`
- Inline comments for complex indicator logic
