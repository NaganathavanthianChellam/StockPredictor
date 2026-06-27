import { create } from 'zustand';
import type { CandidateResult, TickerSignal } from '../types';

interface AppState {
  // Scan state
  scanResults: CandidateResult[];
  isScanning: boolean;
  scanError: string | null;
  selectedStocks: string[];
  
  // Ticker detail state
  tickerDetail: TickerSignal | null;
  loadingTicker: boolean;
  
  // UI state
  sidebarOpen: boolean;
  selectedCandidate: CandidateResult | null;
  
  // Actions
  setScanResults: (results: CandidateResult[]) => void;
  setIsScanning: (scanning: boolean) => void;
  setScanError: (error: string | null) => void;
  setSelectedStocks: (stocks: string[]) => void;
  addStock: (stock: string) => void;
  removeStock: (stock: string) => void;
  clearStocks: () => void;
  
  setTickerDetail: (detail: TickerSignal | null) => void;
  setLoadingTicker: (loading: boolean) => void;
  
  setSidebarOpen: (open: boolean) => void;
  setSelectedCandidate: (candidate: CandidateResult | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  scanResults: [],
  isScanning: false,
  scanError: null,
  selectedStocks: [],
  tickerDetail: null,
  loadingTicker: false,
  sidebarOpen: false,
  selectedCandidate: null,
  
  // Actions
  setScanResults: (results) => set({ scanResults: results }),
  setIsScanning: (scanning) => set({ isScanning: scanning }),
  setScanError: (error) => set({ scanError: error }),
  setSelectedStocks: (stocks) => set({ selectedStocks: stocks }),
  
  addStock: (stock) =>
    set((state) => ({
      selectedStocks: state.selectedStocks.includes(stock)
        ? state.selectedStocks
        : [...state.selectedStocks, stock],
    })),
    
  removeStock: (stock) =>
    set((state) => ({
      selectedStocks: state.selectedStocks.filter((s) => s !== stock),
    })),
    
  clearStocks: () => set({ selectedStocks: [] }),
  
  setTickerDetail: (detail) => set({ tickerDetail: detail }),
  setLoadingTicker: (loading) => set({ loadingTicker: loading }),
  
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setSelectedCandidate: (candidate) => set({ selectedCandidate: candidate }),
}));
