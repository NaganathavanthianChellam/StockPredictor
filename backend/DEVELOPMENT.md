# Development Guide

## Quick Start

### First Time Setup

#### Windows (PowerShell)
```powershell
cd backend
.\run_dev.ps1
```

#### macOS/Linux (Bash)
```bash
cd backend
chmod +x run_dev.sh
./run_dev.sh
```

### Subsequent Runs

#### Windows
```powershell
cd backend
.\venv\Scripts\Activate.ps1
python run.py
```

#### macOS/Linux
```bash
cd backend
source venv/bin/activate
python run.py
```

## Project Layout

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app & endpoints
│   ├── models.py            # Pydantic schemas
│   ├── config.py            # Configuration & thresholds
│   ├── client.py            # Massive API client
│   ├── cache.py             # Bar cache
│   ├── indicators.py        # Technical indicators
│   ├── utils.py             # Utilities
│   ├── pipeline.py          # [TODO] Hard filters, patterns
│   └── scoring.py           # [TODO] Scoring logic
├── run.py                   # Entry point
├── run_dev.ps1              # Windows dev runner
├── run_dev.sh               # Unix dev runner
├── run_dev.bat              # Windows batch runner
├── diagnose.ps1             # Windows diagnostic script
├── Makefile                 # Unix make commands
├── requirements.txt         # Production dependencies
├── requirements-dev.txt     # Development dependencies
└── .env.example             # Environment template
```

## Development Workflow

### 1. Activate Virtual Environment

**Windows (PowerShell):**
```powershell
.\venv\Scripts\Activate.ps1
```

**macOS/Linux (Bash):**
```bash
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt.

### 2. Install Dependencies

```bash
pip install -r requirements.txt

# Or with dev tools:
pip install -r requirements-dev.txt
```

### 3. Setup .env

```bash
# Copy template
cp .env.example .env

# Edit .env and add your POLYGON_TOKEN
```

### 4. Run the Server

```bash
python run.py
```

Server runs at: `http://localhost:8000`
Documentation: `http://localhost:8000/docs`

### 5. Make Changes

Edit files in `app/` and the server will auto-reload (if RELOAD=true in .env)

## Common Development Tasks

### Add a New Dependency

```bash
# With venv activated:
pip install new_package_name

# Update requirements.txt:
pip freeze > requirements.txt
```

### Run Code Quality Checks

```bash
# With dev dependencies installed:
black app/          # Format code
flake8 app/         # Lint
mypy app/           # Type check
```

### Run Tests

```bash
pytest tests/ -v
```

### Diagnose Environment

**Windows:**
```powershell
.\diagnose.ps1
```

### Use Make Commands (Unix/Linux)

```bash
make help           # List all commands
make install        # Install dependencies
make run            # Run app
make lint           # Check code quality
make format         # Auto-format code
make test           # Run tests
make clean          # Remove venv and cache
```

## Environment Variables

Configuration in `.env`:

```
# API Server
HOST=0.0.0.0
PORT=8000
RELOAD=true         # Auto-reload on file changes

# Logging
LOG_LEVEL=INFO

# API Key
POLYGON_TOKEN=your_key_here

# Optional
CACHE_PERSISTENCE=false
```

## API Endpoints

- `GET /health` — Health check
- `POST /scan` — Run universe scan
- `GET /ticker/{symbol}` — Analyze single ticker
- `GET /docs` — Interactive API docs (Swagger UI)
- `GET /redoc` — ReDoc documentation
- `GET /openapi.json` — OpenAPI schema

## Troubleshooting

### Issue: Module not found
**Solution:** Make sure venv is activated and dependencies installed:
```bash
pip install -r requirements.txt
```

### Issue: Port 8000 already in use
**Solution:** Change port in `.env`:
```
PORT=8001
```

### Issue: Changes not reloading
**Solution:** Ensure `RELOAD=true` in `.env` and restart the server.

### Issue: POLYGON_TOKEN error
**Solution:** Add your API token to `.env`:
```
POLYGON_TOKEN=your_actual_token
```

### Issue: Virtual environment broken
**Solution:** Recreate it:
```bash
rm -r venv/
python -m venv venv
pip install -r requirements.txt
```

## Code Style

- **Python**: PEP 8 compliant
- **Type hints**: Use throughout (Pydantic models)
- **Docstrings**: Module, class, and function level
- **Line length**: 100 characters (configured in Makefile)

Format with:
```bash
black app/ --line-length=100
```

## Git Workflow

- Never commit `.env` (it's in .gitignore)
- Commit `requirements.txt` after adding dependencies
- Use descriptive commit messages
- Create feature branches for new features

## Next Steps

1. Implement `app/pipeline.py` — Hard filter logic
2. Implement `app/scoring.py` — Scoring & ranking
3. Write unit tests in `tests/`
4. Build React frontend
5. Add database persistence

See `.kiro/spec.md` for the full implementation plan.
