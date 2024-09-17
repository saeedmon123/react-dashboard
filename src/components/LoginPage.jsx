import React, { useState } from 'react';
import '../styles/loginPage.css'; // Correct path from components folder to styles

import { useNavigate } from 'react-router-dom';
const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Check if credentials are correct
      const isLoggedIn = onLogin(username, password);
  
      if (!isLoggedIn) {
        // Show error message if login fails
        setErrorMessage('Invalid username or password. Please try again.');
      } else {
        // Redirect to appropriate page based on role
        if (username === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    };
  
    return (
      <div className="login-page">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </form>
        </div>
      </div>
    );
  };
  
  export default LoginPage;