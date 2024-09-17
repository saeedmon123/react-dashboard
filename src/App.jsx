import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import usePersistentState from './hooks/usePersistentState';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users] = usePersistentState('users', { admin: 'admin123' });

  const handleLogin = (username, password) => {
    if (users[username] && users[username] === password) {
      setLoggedIn(true);
      if (username === 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      localStorage.setItem('username', username);
      return true;
    } else {
      return false; // Invalid login
    }
  };

  const ProtectedRoute = ({ children }) => {
    if (!loggedIn) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Public Route - Login Page */}
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        
        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              {isAdmin ? <AdminDashboard /> : <Navigate to="/dashboard" />} 
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
