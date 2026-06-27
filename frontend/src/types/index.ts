export interface Stock {
  symbol: string;
  name: string;
  sector: string;
  exchange: 'NSE' | 'BSE';
}

export interface ScanRequest {
  stocks: string[];
  as_of?: string;
  top_n?: number;
  min_score?: number;
  max_per_sector?: number;
}

export interface PatternDetail {
  name: string;
  confirmed: boolean;
  confidence: number;
  pivot: number;
  base_height: number;
}

export interface CandidateResult {
  symbol: string;
  sector: string;
  signal: 'BUY' | 'WATCH' | 'AVOID';
  final_score: number;
  composite_score: number;
  stage: number;
  pattern?: PatternDetail;
  strategies_passing: string[];
  minervini_pass_count: number;
  rs_rank: number;
  rmv15: number;
  rvol_today: number;
  atr_14: number;
  extension_severity: number;
  chasing: boolean;
  entry_zone: [number, number];
  stop: number;
  risk_pct: number;
  target_1: number;
  target_2: number;
  position_size_hint_pct_account: number;
  thesis: string;
}

export interface ScanResponse {
  scan_id: string;
  as_of: string;
  horizon_days: number;
  config_hash: string;
  market_regime: 'risk_on' | 'risk_off';
  spy_close: number;
  spy_ema21: number;
  universe_size_after_liquidity: number;
  candidates_passing_all_gates: number;
  candidates_returned: number;
  api_calls_used: number;
  results: CandidateResult[];
}

export interface TickerSignal {
  symbol: string;
  as_of: string;
  close: number;
  stage: number;
  signal: 'BUY' | 'WATCH' | 'AVOID';
  hard_filter_failures: string[];
  composite_score: number;
  final_score: number;
  pattern?: PatternDetail;
  minervini_pass_count: number;
  minervini_details: Record<string, any>;
  stine_details: Record<string, any>;
  elder_weekly: 'GREEN' | 'BLUE' | 'RED';
  extension_severity: number;
  chasing: boolean;
  entry_zone?: [number, number];
  stop?: number;
  target_1?: number;
  target_2?: number;
  thesis: string;
}

export interface HealthResponse {
  status: string;
  as_of: string;
  timestamp: string;
}

export interface IndianStock extends Stock {
  isin: string;
  industry: string;
  market_cap?: string;
}
