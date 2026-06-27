import type { IndianStock } from '../types';

// Popular Indian stocks across sectors
export const POPULAR_INDIAN_STOCKS: IndianStock[] = [
  // Banking & Financial Services
  { symbol: 'HDFCBANK', name: 'HDFC Bank', sector: 'Banking', exchange: 'NSE', isin: 'INE040A01034', industry: 'Private Bank' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', sector: 'Banking', exchange: 'NSE', isin: 'INE090A01021', industry: 'Private Bank' },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', sector: 'Banking', exchange: 'NSE', isin: 'INE237A01028', industry: 'Private Bank' },
  { symbol: 'SBIN', name: 'State Bank of India', sector: 'Banking', exchange: 'NSE', isin: 'INE062A01020', industry: 'Public Bank' },
  { symbol: 'AXISBANK', name: 'Axis Bank', sector: 'Banking', exchange: 'NSE', isin: 'INE238A01034', industry: 'Private Bank' },
  
  // IT & Technology
  { symbol: 'TCS', name: 'Tata Consultancy Services', sector: 'IT', exchange: 'NSE', isin: 'INE467B01029', industry: 'IT Services' },
  { symbol: 'INFY', name: 'Infosys', sector: 'IT', exchange: 'NSE', isin: 'INE009A01021', industry: 'IT Services' },
  { symbol: 'WIPRO', name: 'Wipro', sector: 'IT', exchange: 'NSE', isin: 'INE075A01022', industry: 'IT Services' },
  { symbol: 'HCLTECH', name: 'HCL Technologies', sector: 'IT', exchange: 'NSE', isin: 'INE860A01027', industry: 'IT Services' },
  { symbol: 'TECHM', name: 'Tech Mahindra', sector: 'IT', exchange: 'NSE', isin: 'INE669C01036', industry: 'IT Services' },
  
  // FMCG
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', sector: 'FMCG', exchange: 'NSE', isin: 'INE030A01027', industry: 'Consumer Goods' },
  { symbol: 'ITC', name: 'ITC Limited', sector: 'FMCG', exchange: 'NSE', isin: 'INE154A01025', industry: 'Diversified' },
  { symbol: 'NESTLEIND', name: 'Nestle India', sector: 'FMCG', exchange: 'NSE', isin: 'INE239A01016', industry: 'Food Products' },
  { symbol: 'BRITANNIA', name: 'Britannia Industries', sector: 'FMCG', exchange: 'NSE', isin: 'INE216A01030', industry: 'Food Products' },
  
  // Automobiles
  { symbol: 'MARUTI', name: 'Maruti Suzuki', sector: 'Auto', exchange: 'NSE', isin: 'INE585B01010', industry: 'Automobiles' },
  { symbol: 'M&M', name: 'Mahindra & Mahindra', sector: 'Auto', exchange: 'NSE', isin: 'INE101A01026', industry: 'Automobiles' },
  { symbol: 'TATAMOTORS', name: 'Tata Motors', sector: 'Auto', exchange: 'NSE', isin: 'INE155A01022', industry: 'Automobiles' },
  { symbol: 'BAJAJ-AUTO', name: 'Bajaj Auto', sector: 'Auto', exchange: 'NSE', isin: 'INE917I01010', industry: 'Automobiles' },
  
  // Pharmaceuticals
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical', sector: 'Pharma', exchange: 'NSE', isin: 'INE044A01036', industry: 'Pharmaceuticals' },
  { symbol: 'DRREDDY', name: 'Dr. Reddys Laboratories', sector: 'Pharma', exchange: 'NSE', isin: 'INE089A01023', industry: 'Pharmaceuticals' },
  { symbol: 'CIPLA', name: 'Cipla', sector: 'Pharma', exchange: 'NSE', isin: 'INE059A01026', industry: 'Pharmaceuticals' },
  
  // Energy & Power
  { symbol: 'RELIANCE', name: 'Reliance Industries', sector: 'Energy', exchange: 'NSE', isin: 'INE002A01018', industry: 'Diversified' },
  { symbol: 'ONGC', name: 'Oil & Natural Gas Corporation', sector: 'Energy', exchange: 'NSE', isin: 'INE213A01029', industry: 'Oil & Gas' },
  { symbol: 'POWERGRID', name: 'Power Grid Corporation', sector: 'Power', exchange: 'NSE', isin: 'INE752E01010', industry: 'Power Transmission' },
  { symbol: 'NTPC', name: 'NTPC', sector: 'Power', exchange: 'NSE', isin: 'INE733E01010', industry: 'Power Generation' },
  
  // Metals & Mining
  { symbol: 'TATASTEEL', name: 'Tata Steel', sector: 'Metals', exchange: 'NSE', isin: 'INE081A01012', industry: 'Steel' },
  { symbol: 'HINDALCO', name: 'Hindalco Industries', sector: 'Metals', exchange: 'NSE', isin: 'INE038A01020', industry: 'Aluminium' },
  { symbol: 'JSWSTEEL', name: 'JSW Steel', sector: 'Metals', exchange: 'NSE', isin: 'INE019A01038', industry: 'Steel' },
  
  // Telecom
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', sector: 'Telecom', exchange: 'NSE', isin: 'INE397D01024', industry: 'Telecommunications' },
  
  // Cement
  { symbol: 'ULTRACEMCO', name: 'UltraTech Cement', sector: 'Cement', exchange: 'NSE', isin: 'INE481G01011', industry: 'Cement' },
  { symbol: 'GRASIM', name: 'Grasim Industries', sector: 'Cement', exchange: 'NSE', isin: 'INE047A01021', industry: 'Diversified' },
];

export const SECTOR_OPTIONS = [
  'All Sectors',
  'Banking',
  'IT',
  'FMCG',
  'Auto',
  'Pharma',
  'Energy',
  'Power',
  'Metals',
  'Telecom',
  'Cement',
];

export const getStocksBySector = (sector: string): IndianStock[] => {
  if (sector === 'All Sectors') return POPULAR_INDIAN_STOCKS;
  return POPULAR_INDIAN_STOCKS.filter((stock) => stock.sector === sector);
};

export const searchStocks = (query: string): IndianStock[] => {
  const lowerQuery = query.toLowerCase();
  return POPULAR_INDIAN_STOCKS.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(lowerQuery) ||
      stock.name.toLowerCase().includes(lowerQuery)
  );
};
