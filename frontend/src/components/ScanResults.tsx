import { useState } from 'react';
import { TrendingUp, TrendingDown, Eye, Download, ArrowUpDown } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { formatCurrency, formatPercent, getSignalColor, getScoreColor } from '../utils/format';
import type { CandidateResult } from '../types';

export default function ScanResults() {
  const { scanResults, isScanning, setSelectedCandidate } = useAppStore();
  const [sortBy, setSortBy] = useState<keyof CandidateResult>('final_score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  if (isScanning) {
    return (
      <div className="card text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600 mb-4"></div>
        <p className="text-gray-600">Analyzing stocks...</p>
      </div>
    );
  }

  if (scanResults.length === 0) {
    return (
      <div className="card text-center py-12">
        <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Results Yet</h3>
        <p className="text-gray-600">Select stocks above and click "Analyze" to see predictions</p>
      </div>
    );
  }

  const sortedResults = [...scanResults].sort((a, b) => {
    const aVal = a[sortBy] as number;
    const bVal = b[sortBy] as number;
    return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const handleSort = (field: keyof CandidateResult) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const exportResults = () => {
    const csv = [
      ['Symbol', 'Signal', 'Score', 'Entry Low', 'Entry High', 'Stop', 'Target 1', 'Target 2', 'Risk %', 'Thesis'],
      ...sortedResults.map(r => [
        r.symbol,
        r.signal,
        r.final_score.toFixed(1),
        r.entry_zone[0].toFixed(2),
        r.entry_zone[1].toFixed(2),
        r.stop.toFixed(2),
        r.target_1.toFixed(2),
        r.target_2.toFixed(2),
        r.risk_pct.toFixed(2),
        r.thesis,
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stock-analysis-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Investment Analysis Results</h2>
          <p className="text-sm text-gray-600 mt-1">
            {scanResults.length} stocks analyzed • Click any row for detailed analysis
          </p>
        </div>
        <button
          onClick={exportResults}
          className="btn btn-secondary flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left">
                <button onClick={() => handleSort('symbol')} className="flex items-center space-x-1 font-semibold text-gray-700 hover:text-gray-900">
                  <span>Stock</span>
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">Signal</th>
              <th className="px-4 py-3 text-right">
                <button onClick={() => handleSort('final_score')} className="flex items-center space-x-1 ml-auto font-semibold text-gray-700 hover:text-gray-900">
                  <span>Score</span>
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="px-4 py-3 text-right">Entry Zone</th>
              <th className="px-4 py-3 text-right">Stop Loss</th>
              <th className="px-4 py-3 text-right">Target 1</th>
              <th className="px-4 py-3 text-right">Target 2</th>
              <th className="px-4 py-3 text-right">Risk %</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.map((result, idx) => (
              <tr
                key={result.symbol}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedCandidate(result)}
              >
                <td className="px-4 py-4">
                  <div>
                    <div className="font-semibold text-gray-900">{result.symbol}</div>
                    <div className="text-xs text-gray-500">{result.sector}</div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`badge ${getSignalColor(result.signal)} font-semibold`}>
                    {result.signal}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className={`text-lg font-bold ${getScoreColor(result.final_score)}`}>
                    {result.final_score.toFixed(0)}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="text-sm">
                    <div>{formatCurrency(result.entry_zone[0])}</div>
                    <div className="text-gray-500">{formatCurrency(result.entry_zone[1])}</div>
                  </div>
                </td>
                <td className="px-4 py-4 text-right text-danger-600 font-medium">
                  {formatCurrency(result.stop)}
                </td>
                <td className="px-4 py-4 text-right text-success-600 font-medium">
                  {formatCurrency(result.target_1)}
                </td>
                <td className="px-4 py-4 text-right text-success-600 font-medium">
                  {formatCurrency(result.target_2)}
                </td>
                <td className="px-4 py-4 text-right">
                  <span className={result.risk_pct > 7 ? 'text-danger-600' : 'text-gray-700'}>
                    {result.risk_pct.toFixed(1)}%
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <button className="btn-secondary p-2 rounded-lg">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Statistics */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-success-600">
            {sortedResults.filter(r => r.signal === 'BUY').length}
          </div>
          <div className="text-sm text-gray-600">Strong Buy Signals</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {sortedResults.filter(r => r.signal === 'WATCH').length}
          </div>
          <div className="text-sm text-gray-600">Watch List</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary-600">
            {(sortedResults.reduce((sum, r) => sum + r.final_score, 0) / sortedResults.length).toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">Average Score</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-700">
            {sortedResults.filter(r => r.pattern).length}
          </div>
          <div className="text-sm text-gray-600">Patterns Detected</div>
        </div>
      </div>
    </div>
  );
}
