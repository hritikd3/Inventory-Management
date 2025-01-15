import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { store } from './store';
import { ChevronLeft } from 'lucide-react';
import RoomSelector from './components/RoomSelector';
import InventoryList from './components/InventoryList';
import CategoryView from './components/CategoryView';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const showBackButton = location.pathname !== '/' || location.state?.fromCategory;

  return (
    <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center">
      {showBackButton && (
        <button 
          onClick={() => navigate(-1)} 
          className="p-1 -ml-1"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      <h1 className="text-xl font-semibold text-center flex-1">Add Inventory</h1>
    </div>
  );
}

function AppContent() {
  const [viewMode, setViewMode] = useState<'room' | 'category'>('room');
  const navigate = useNavigate();

  const handleViewModeChange = (mode: 'room' | 'category') => {
    setViewMode(mode);
    if (mode === 'room') {
      navigate('/', { replace: true });
    } else {
      navigate('/', { state: { fromCategory: true }, replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-lg">
        <Header />
        <div className="flex space-x-4 p-4">
          <button
            className={`flex-1 py-2 px-4 rounded-lg ${
              viewMode === 'room'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => handleViewModeChange('room')}
          >
            Room Wise
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg ${
              viewMode === 'category'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => handleViewModeChange('category')}
          >
            Categories Wise
          </button>
        </div>
        {viewMode === 'room' ? (
          <Routes>
            <Route path="/" element={<RoomSelector />} />
            <Route path="/inventory" element={<InventoryList />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        ) : (
          <CategoryView />
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;