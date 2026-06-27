import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import StockSelector from './components/StockSelector';
import ScanResults from './components/ScanResults';
import TickerDetail from './components/TickerDetail';
import LoadingScreen from './components/LoadingScreen';
import { useAppStore } from './store/useAppStore';
import { healthCheck } from './services/api';

function App() {
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const selectedCandidate = useAppStore((state) => state.selectedCandidate);

  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        await healthCheck();
        setApiStatus('online');
      } catch (error) {
        console.error('API health check failed:', error);
        setApiStatus('offline');
      }
    };

    checkApiHealth();
    const interval = setInterval(checkApiHealth, 30000); // Check every 30s

    return () => clearInterval(interval);
  }, []);

  if (apiStatus === 'checking') {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      <Header apiStatus={apiStatus} />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-8">
          <section className="animate-slide-down">
            <StockSelector />
          </section>
          
          <section className="animate-slide-up">
            <ScanResults />
          </section>
        </div>
      </main>

      {selectedCandidate && (
        <TickerDetail 
          candidate={selectedCandidate}
          onClose={() => useAppStore.getState().setSelectedCandidate(null)}
        />
      )}
    </div>
  );
}

export default App;
