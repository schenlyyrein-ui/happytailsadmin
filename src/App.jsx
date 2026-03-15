import React, { useMemo, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import Bookings from './components/Bookings';
import Inventory from './components/Inventory';
import Orders from './components/Orders';
import Reviews from './components/Reviews';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import RiderManagement from './components/RiderManagement';
import logo from './assets/Ht-logo.png';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [notificationCounts, setNotificationCounts] = useState({
    dashboard: 3,
    bookings: 2,
    orders: 1
  });

  const handleLogin = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setCurrentPage('dashboard');
  };

  const handleNotificationCountChange = (page, count) => {
    setNotificationCounts((prev) => ({ ...prev, [page]: count }));
  };

  const hasNotifications = useMemo(
    () => Object.values(notificationCounts).some((count) => count > 0),
    [notificationCounts]
  );

  const renderNavLabel = (label, pageKey) => {
    const count = notificationCounts[pageKey] || 0;
    return (
      <>
        <span>{label}</span>
        {count > 0 && <span className="nav-item-notif-badge">{count > 99 ? '99+' : count}</span>}
      </>
    );
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard userType={userType} onNotificationCountChange={(count) => handleNotificationCountChange('dashboard', count)} />;
      case 'customers':
        return <Customers />;
      case 'bookings':
        return <Bookings onNotificationCountChange={(count) => handleNotificationCountChange('bookings', count)} />;
      case 'orders':
        return <Orders onNotificationCountChange={(count) => handleNotificationCountChange('orders', count)} />;
      case 'reviews':
        return <Reviews />;
      case 'inventory':
        return <Inventory />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      case 'riders':
        return <RiderManagement />;
      default:
        return <Dashboard userType={userType} />;
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
          <div className="sidebar-meta-row">
            <div className="user-badge">
              <span className="user-type-label">{userType === 'owner' ? 'OWNER' : 'STAFF'}</span>
            </div>
            {hasNotifications && <span className="sidebar-notification-indicator" aria-label="New notifications" />}
          </div>
        </div>

        <nav className="nav-menu">
          <button
            className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            {renderNavLabel('Overview', 'dashboard')}
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
              {renderNavLabel('Bookings', 'bookings')}
            </button>
            <button
              className={`nav-item ${currentPage === 'orders' ? 'active' : ''}`}
              onClick={() => setCurrentPage('orders')}
            >
              {renderNavLabel('Orders', 'orders')}
            </button>
            <button
              className={`nav-item ${currentPage === 'reviews' ? 'active' : ''}`}
              onClick={() => setCurrentPage('reviews')}
            >
              Reviews
            </button>
            <button
              className={`nav-item ${currentPage === 'riders' ? 'active' : ''}`}
              onClick={() => setCurrentPage('riders')}
            >
              Rider Management
            </button>
            <button
              className={`nav-item ${currentPage === 'inventory' ? 'active' : ''}`}
              onClick={() => setCurrentPage('inventory')}
            >
              Inventory
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
