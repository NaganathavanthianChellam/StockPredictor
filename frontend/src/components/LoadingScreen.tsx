import { TrendingUp } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block bg-white p-6 rounded-2xl shadow-2xl mb-6 animate-pulse-slow">
          <TrendingUp className="w-16 h-16 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">StockPredictor</h2>
        <p className="text-gray-600">Initializing system...</p>
        <div className="mt-4 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}
