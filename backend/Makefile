.PHONY: help venv install install-dev run run-dev clean lint format test

help:
	@echo "StockPredictor - Available Make Commands"
	@echo "=========================================="
	@echo "make venv        - Create virtual environment"
	@echo "make install     - Install production dependencies"
	@echo "make install-dev - Install development dependencies"
	@echo "make run         - Run the application"
	@echo "make run-dev     - Run in development mode (with reload)"
	@echo "make clean       - Remove virtual environment and cache"
	@echo "make lint        - Run code linter (flake8)"
	@echo "make format      - Format code (black)"
	@echo "make test        - Run tests (pytest)"
	@echo ""

venv:
	python3 -m venv venv
	. venv/bin/activate && pip install --upgrade pip

install: venv
	. venv/bin/activate && pip install -r requirements.txt

install-dev: venv
	. venv/bin/activate && pip install -r requirements-dev.txt

run: install
	. venv/bin/activate && python run.py

run-dev: install
	. venv/bin/activate && RELOAD=true python run.py

clean:
	rm -rf venv/
	rm -rf __pycache__/
	rm -rf .pytest_cache/
	rm -rf .mypy_cache/
	find . -type f -name "*.pyc" -delete
	find . -type d -name "__pycache__" -delete

lint:
	. venv/bin/activate && flake8 app/ --max-line-length=100

format:
	. venv/bin/activate && black app/ --line-length=100

test:
	. venv/bin/activate && pytest tests/ -v

# Development shortcuts
.venv-check:
	@if [ ! -d "venv" ]; then echo "Virtual environment not found. Run 'make install' first."; exit 1; fi
