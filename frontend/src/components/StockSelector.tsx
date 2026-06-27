import { useState } from 'react';
import { Search, Plus, X, Play, Trash2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { scanStocks } from '../services/api';
import { POPULAR_INDIAN_STOCKS, SECTOR_OPTIONS, getStocksBySector, searchStocks } from '../utils/indianStocks';
import toast from 'react-hot-toast';

export default function StockSelector() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [showDropdown, setShowDropdown] = useState(false);
  
  const { selectedStocks, addStock, removeStock, clearStocks, setIsScanning, setScanResults, setScanError } = useAppStore();

  const filteredStocks = searchQuery
    ? searchStocks(searchQuery)
    : getStocksBySector(selectedSector);

  const handleAddStock = (symbol: string) => {
    if (selectedStocks.length >= 50) {
      toast.error('Maximum 50 stocks allowed per scan');
      return;
    }
    addStock(symbol);
    toast.success(`${symbol} added to scan list`);
    setSearchQuery('');
    setShowDropdown(false);
  };

  const handleScan = async () => {
    if (selectedStocks.length === 0) {
      toast.error('Please select at least one stock');
      return;
    }

    setIsScanning(true);
    setScanError(null);
    toast.loading('Scanning stocks...', { id: 'scan' });

    try {
      const response = await scanStocks({
        stocks: selectedStocks,
        top_n: 20,
        min_score: 60,
        max_per_sector: 5,
      });
      
      setScanResults(response.results);
      toast.success(`Scan complete! Found ${response.candidates_returned} candidates`, { id: 'scan' });
    } catch (error: any) {
      console.error('Scan failed:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Scan failed';
      setScanError(errorMsg);
      toast.error(errorMsg, { id: 'scan' });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Select Indian Stocks</h2>
          <p className="text-sm text-gray-600 mt-1">
            Choose stocks from NSE/BSE to analyze investment potential
          </p>
        </div>
        
        {selectedStocks.length > 0 && (
          <button
            onClick={clearStocks}
            className="btn btn-secondary flex items-center space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search stocks by symbol or name..."
            className="input pl-10"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
          />
          
          {showDropdown && filteredStocks.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
              {filteredStocks.slice(0, 10).map((stock) => (
                <button
                  key={stock.symbol}
                  onClick={() => handleAddStock(stock.symbol)}
                  disabled={selectedStocks.includes(stock.symbol)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div>
                    <div className="font-semibold text-gray-900">{stock.symbol}</div>
                    <div className="text-sm text-gray-600">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <span className="badge badge-info">{stock.sector}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <select
          className="input"
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
        >
          {SECTOR_OPTIONS.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
      </div>

      {/* Popular Stocks Quick Add */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Add Popular Stocks:</h3>
        <div className="flex flex-wrap gap-2">
          {POPULAR_INDIAN_STOCKS.slice(0, 12).map((stock) => (
            <button
              key={stock.symbol}
              onClick={() => handleAddStock(stock.symbol)}
              disabled={selectedStocks.includes(stock.symbol)}
              className="px-3 py-1.5 text-sm font-medium bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <Plus className="w-3 h-3" />
              <span>{stock.symbol}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Stocks */}
      {selectedStocks.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">
              Selected Stocks ({selectedStocks.length}/50)
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedStocks.map((symbol) => (
              <div
                key={symbol}
                className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-gray-200"
              >
                <span className="font-medium text-gray-900">{symbol}</span>
                <button
                  onClick={() => {
                    removeStock(symbol);
                    toast.success(`${symbol} removed`);
                  }}
                  className="text-gray-400 hover:text-danger-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scan Button */}
      <button
        onClick={handleScan}
        disabled={selectedStocks.length === 0}
        className="btn btn-primary w-full text-lg py-3 flex items-center justify-center space-x-2"
      >
        <Play className="w-5 h-5" />
        <span>Analyze & Predict Investment Potential</span>
      </button>
    </div>
  );
}
