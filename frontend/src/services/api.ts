import axios from 'axios';
import type { ScanRequest, ScanResponse, TickerSignal, HealthResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000, // 2 minutes for scan operations
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API] Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`[API] Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error('[API] Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const healthCheck = async (): Promise<HealthResponse> => {
  const response = await api.get<HealthResponse>('/health');
  return response.data;
};

export const scanStocks = async (request: ScanRequest): Promise<ScanResponse> => {
  const response = await api.post<ScanResponse>('/scan', request);
  return response.data;
};

export const getTickerDetail = async (
  symbol: string,
  asOf?: string
): Promise<TickerSignal> => {
  const params = asOf ? { as_of: asOf } : {};
  const response = await api.get<TickerSignal>(`/ticker/${symbol}`, { params });
  return response.data;
};

export default api;
