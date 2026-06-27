# StockPredictor Frontend

Professional React + TypeScript UI for analyzing Indian stocks and predicting investment potential.

## Features

✨ **Modern UI/UX**
- Clean, professional design inspired by top financial platforms
- Responsive layout for desktop, tablet, and mobile
- Smooth animations and transitions
- Dark mode support (coming soon)

📊 **Stock Analysis**
- Search and select from popular Indian stocks (NSE/BSE)
- Filter by sector (Banking, IT, FMCG, Auto, Pharma, etc.)
- Bulk stock analysis with real-time predictions
- Detailed technical indicators and scores

💰 **Investment Insights**
- Buy/Watch/Avoid signals with confidence scores
- Entry zones, stop loss, and target prices
- Risk/reward ratios
- Pattern detection (VCP, Flat Base, Darvas, Tight Flag)
- Strategy confluence (Minervini, Stine, Elder)

📈 **Data Visualization**
- Sortable results table
- Export to CSV functionality
- Summary statistics dashboard
- Detailed stock modal with all metrics

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Lightning-fast build tool
- **Axios** - HTTP client for API calls
- **Zustand** - State management
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Elegant notifications

## Getting Started

### Prerequisites

- Node.js 18+ (download from [nodejs.org](https://nodejs.org/))
- npm or yarn

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Built files will be in `dist/` directory.

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000
```

## Project Structure

```
frontend/
├── src/
│   ├── components/        # React components
│   │   ├── Header.tsx
│   │   ├── StockSelector.tsx
│   │   ├── ScanResults.tsx
│   │   └── TickerDetail.tsx
│   ├── services/          # API services
│   │   └── api.ts
│   ├── store/             # State management
│   │   └── useAppStore.ts
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   ├── utils/             # Utility functions
│   │   ├── format.ts
│   │   └── indianStocks.ts
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: { ... },  # Your brand color
      success: { ... },  # Positive signals
      danger: { ... },   # Negative signals
    }
  }
}
```

### Indian Stocks List

Edit `src/utils/indianStocks.ts` to add more stocks:

```typescript
export const POPULAR_INDIAN_STOCKS: IndianStock[] = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    sector: 'Energy',
    exchange: 'NSE',
    isin: 'INE002A01018',
    industry: 'Diversified',
  },
  // Add more...
];
```

## API Integration

The frontend connects to the FastAPI backend at `http://localhost:8000` by default.

Endpoints used:
- `GET /health` - Health check
- `POST /scan` - Analyze stocks
- `GET /ticker/{symbol}` - Get ticker details

## Features Overview

### Stock Selector
- Quick search by symbol or name
- Filter by sector
- Quick-add popular stocks
- Visual stock selection with chips
- Maximum 50 stocks per scan

### Scan Results
- Sortable table (by score, symbol, etc.)
- Signal badges (BUY/WATCH/AVOID)
- Entry zones, stop loss, targets
- Risk percentage
- CSV export functionality
- Summary statistics

### Ticker Detail Modal
- Investment score breakdown
- Investment thesis
- Entry & exit strategy
- Price targets with R:R ratio
- Technical indicators
- Pattern detection details
- Strategy confluence

## Development Tips

### Hot Module Replacement
Vite provides instant HMR. Changes appear immediately without page refresh.

### TypeScript
The project is fully typed. Use TypeScript for better IDE support and catch errors early.

### State Management
Zustand provides simple, hooks-based state management. See `src/store/useAppStore.ts`.

### Styling
Tailwind CSS provides utility classes. See `tailwind.config.js` for custom utilities.

## Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.ts
server: {
  port: 3001,
}
```

### API Connection Errors
- Ensure backend is running on `http://localhost:8000`
- Check CORS settings in backend
- Verify `VITE_API_URL` in `.env`

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT License - See LICENSE file for details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For issues and questions:
- Check existing issues on GitHub
- Create a new issue with detailed description
- Include screenshots for UI-related issues
