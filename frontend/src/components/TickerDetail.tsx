import { X, TrendingUp, Target, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import type { CandidateResult } from '../types';
import { formatCurrency, formatPercent, getSignalColor, getScoreColor } from '../utils/format';

interface TickerDetailProps {
  candidate: CandidateResult;
  onClose: () => void;
}

export default function TickerDetail({ candidate, onClose }: TickerDetailProps) {
  const riskRewardRatio = ((candidate.target_1 - candidate.entry_zone[0]) / (candidate.entry_zone[0] - candidate.stop));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{candidate.symbol}</h2>
            <p className="text-sm text-gray-600">{candidate.sector}</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`badge ${getSignalColor(candidate.signal)} text-lg px-4 py-2 font-bold`}>
              {candidate.signal}
            </span>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Score Card */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
            <div className="text-center">
              <div className={`text-6xl font-bold ${getScoreColor(candidate.final_score)} mb-2`}>
                {candidate.final_score.toFixed(0)}
              </div>
              <div className="text-sm text-gray-700 font-medium">Investment Score</div>
              <div className="mt-4 flex justify-center space-x-6 text-sm">
                <div>
                  <div className="text-gray-600">Composite</div>
                  <div className="font-semibold text-gray-900">{candidate.composite_score.toFixed(0)}</div>
                </div>
                <div>
                  <div className="text-gray-600">Stage</div>
                  <div className="font-semibold text-gray-900">{candidate.stage}</div>
                </div>
                <div>
                  <div className="text-gray-600">RS Rank</div>
                  <div className="font-semibold text-gray-900">{candidate.rs_rank.toFixed(0)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Thesis */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
              Investment Thesis
            </h3>
            <p className="text-gray-700 leading-relaxed">{candidate.thesis}</p>
          </div>

          {/* Entry & Exit Strategy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Entry Zone */}
            <div className="card bg-success-50 border-success-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <TrendingUp className="w-5 h-5 text-success-600 mr-2" />
                  Entry Zone
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Lower Bound</span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatCurrency(candidate.entry_zone[0])}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Upper Bound</span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatCurrency(candidate.entry_zone[1])}
                  </span>
                </div>
                <div className="pt-3 border-t border-success-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Position Size</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {candidate.position_size_hint_pct_account.toFixed(1)}% of capital
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stop Loss */}
            <div className="card bg-danger-50 border-danger-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Shield className="w-5 h-5 text-danger-600 mr-2" />
                  Risk Management
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Stop Loss</span>
                  <span className="text-lg font-bold text-danger-600">
                    {formatCurrency(candidate.stop)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Risk Per Trade</span>
                  <span className="text-lg font-bold text-danger-600">
                    {candidate.risk_pct.toFixed(2)}%
                  </span>
                </div>
                {candidate.chasing && (
                  <div className="pt-3 border-t border-danger-200">
                    <div className="flex items-center space-x-2 text-sm text-orange-700">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="font-medium">Extended Price Warning</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Targets */}
          <div className="card bg-gradient-to-br from-success-50 to-success-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="w-5 h-5 text-success-600 mr-2" />
              Price Targets
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Entry (Mid)</div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency((candidate.entry_zone[0] + candidate.entry_zone[1]) / 2)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Target 1</div>
                <div className="text-2xl font-bold text-success-600">
                  {formatCurrency(candidate.target_1)}
                </div>
                <div className="text-xs text-success-700 mt-1">
                  +{formatPercent(((candidate.target_1 / candidate.entry_zone[0]) - 1) * 100, 1)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Target 2</div>
                <div className="text-2xl font-bold text-success-700">
                  {formatCurrency(candidate.target_2)}
                </div>
                <div className="text-xs text-success-800 mt-1">
                  +{formatPercent(((candidate.target_2 / candidate.entry_zone[0]) - 1) * 100, 1)}
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-success-200 text-center">
              <div className="text-sm text-gray-600">Risk:Reward Ratio</div>
              <div className="text-xl font-bold text-gray-900">
                1:{riskRewardRatio.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Technical Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card text-center bg-gray-50">
              <div className="text-sm text-gray-600 mb-1">RS Rank</div>
              <div className="text-xl font-bold text-gray-900">{candidate.rs_rank.toFixed(0)}</div>
            </div>
            <div className="card text-center bg-gray-50">
              <div className="text-sm text-gray-600 mb-1">RMV15</div>
              <div className="text-xl font-bold text-gray-900">{candidate.rmv15.toFixed(1)}</div>
            </div>
            <div className="card text-center bg-gray-50">
              <div className="text-sm text-gray-600 mb-1">ATR(14)</div>
              <div className="text-xl font-bold text-gray-900">{candidate.atr_14.toFixed(2)}</div>
            </div>
            <div className="card text-center bg-gray-50">
              <div className="text-sm text-gray-600 mb-1">RVol</div>
              <div className="text-xl font-bold text-gray-900">{candidate.rvol_today.toFixed(2)}</div>
            </div>
          </div>

          {/* Pattern Detection */}
          {candidate.pattern && (
            <div className="card bg-purple-50 border-purple-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Pattern Detected</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Pattern</div>
                  <div className="font-semibold text-gray-900">{candidate.pattern.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Confirmed</div>
                  <div className="font-semibold text-gray-900">
                    {candidate.pattern.confirmed ? 'Yes' : 'No'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Confidence</div>
                  <div className="font-semibold text-gray-900">
                    {(candidate.pattern.confidence * 100).toFixed(0)}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Pivot</div>
                  <div className="font-semibold text-gray-900">
                    {formatCurrency(candidate.pattern.pivot)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Strategies Passing */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Strategy Confluence</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.strategies_passing.map((strategy) => (
                <span key={strategy} className="badge badge-success text-sm px-3 py-1.5">
                  {strategy}
                </span>
              ))}
            </div>
            <div className="mt-3 text-sm text-gray-600">
              Minervini Rules Passed: {candidate.minervini_pass_count}/8
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="btn btn-primary flex-1 py-3">
              Add to Watchlist
            </button>
            <button className="btn btn-secondary flex-1 py-3">
              Share Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
