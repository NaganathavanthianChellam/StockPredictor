import { TrendingUp, Activity, AlertCircle } from 'lucide-react';

interface HeaderProps {
  apiStatus: 'online' | 'offline';
}

export default function Header({ apiStatus }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-2 rounded-lg shadow-md">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                StockPredictor
              </h1>
              <p className="text-sm text-gray-600">
                Smart Investment Analysis for Indian Markets
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {apiStatus === 'online' ? (
                <>
                  <Activity className="w-5 h-5 text-success-500 animate-pulse" />
                  <span className="text-sm font-medium text-success-600">
                    API Online
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-danger-500" />
                  <span className="text-sm font-medium text-danger-600">
                    API Offline
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
