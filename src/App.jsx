// App.jsx
import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import Bookings from './components/Bookings';
import Inventory from './components/Inventory';
import Orders from './components/Orders';
import Loyalty from './components/Loyalty';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import logo from './assets/Ht-logo.png';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setCurrentPage('dashboard');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard userType={userType} />;
      case 'customers':
        return <Customers />;
      case 'bookings':
        return <Bookings />;
      case 'orders':
        return <Orders />;
      case 'inventory':
        return <Inventory />;
      case 'loyalty':
        return <Loyalty />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        <div className="logo-section">
          <div className="logo-container">
            <img src={logo} alt="Happy Tails Logo" className="logo-image" />
            <div className="brand-text">
              <span className="happy-text">Happy</span>
              <span className="tails-text">Tails</span>
            </div>
          </div>
          <div className="user-badge">
            <span className="user-type-label">{userType === 'owner' ? 'OWNER' : 'STAFF'}</span>
          </div>
        </div>
        
        <nav className="nav-menu">
          <button 
            className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            Overview
          </button>
          
          <div className="nav-section">
            <button 
              className={`nav-item ${currentPage === 'customers' ? 'active' : ''}`}
              onClick={() => setCurrentPage('customers')}
            >
              Customers
            </button>
            <button 
              className={`nav-item ${currentPage === 'bookings' ? 'active' : ''}`}
              onClick={() => setCurrentPage('bookings')}
            >
              Bookings
            </button>
            <button 
              className={`nav-item ${currentPage === 'orders' ? 'active' : ''}`}
              onClick={() => setCurrentPage('orders')}
            >
              Orders
            </button>
            <button 
              className={`nav-item ${currentPage === 'inventory' ? 'active' : ''}`}
              onClick={() => setCurrentPage('inventory')}
            >
              Inventory
            </button>
            <button 
              className={`nav-item ${currentPage === 'loyalty' ? 'active' : ''}`}
              onClick={() => setCurrentPage('loyalty')}
            >
              Loyalty
            </button>
            <button 
              className={`nav-item ${currentPage === 'analytics' ? 'active' : ''}`}
              onClick={() => setCurrentPage('analytics')}
            >
              Analytics
            </button>
            <button 
              className={`nav-item ${currentPage === 'settings' ? 'active' : ''}`}
              onClick={() => setCurrentPage('settings')}
            >
              Settings
            </button>
          </div>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>

      <div className="main-content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;