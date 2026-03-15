// Login.jsx
import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/Ht-logo.png';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('staff');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(userType);
  };

  return (
    <div className="login-container">
      <div className="login-layout">
        <section className="login-visual-panel" aria-label="Happy Tails brand">
          <img src={logo} alt="Happy Tails Logo" className="login-hero-logo" />
        </section>

        <section className="login-form-panel">
          <div className="login-card">
            <h1 className="login-title">Happy Tails Admin</h1>

            <div className="user-type-selector">
              <button
                type="button"
                className={`type-btn ${userType === 'owner' ? 'active' : ''}`}
                onClick={() => setUserType('owner')}
              >
                Owner
              </button>
              <button
                type="button"
                className={`type-btn ${userType === 'staff' ? 'active' : ''}`}
                onClick={() => setUserType('staff')}
              >
                Staff
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@happytails.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="forgot-password">
                <a href="#">Forgot password?</a>
              </div>

              <button type="submit" className="signin-btn">
                Sign In
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;