import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/api';
import '../styles/loginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(username, password);
      console.log(user); // Check the response in the console
  
      // If the user is an admin, redirect to admin dashboard
      if (user.is_admin) {
        console.log('Redirecting to admin dashboard');
        navigate('/admin-dashboard'); // Redirect admin
      } else {
        // Store user ID and redirect regular user to the dashboard
        localStorage.setItem('userId', user.id);
        navigate('/dashboard');
      }
    } catch (error) {
      setErrorMessage('Invalid username or password.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
