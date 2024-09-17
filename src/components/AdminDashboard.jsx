import React, { useState } from 'react';
import usePersistentState from '../hooks/usePersistentState';
import '../styles/adminDashboard.css'; // Import the styles

const AdminDashboard = () => {
  const [users, setUsers] = usePersistentState('users', { admin: 'admin123' });
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleAddUser = () => {
    // Ensure both username and password are provided
    if (newUsername && newPassword) {
      setUsers((prevUsers) => ({
        ...prevUsers,
        [newUsername]: newPassword,  // Add new user to the list
      }));
      // Clear inputs
      setNewUsername('');
      setNewPassword('');
    } else {
      alert('Please enter both a username and password.');
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-box">
        <h2>Admin Dashboard</h2>
        <div>
          <h3>Add New User</h3>
          <input
            type="text"
            placeholder="Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleAddUser}>Add User</button>
        </div>
        <div>
          <h3>Existing Users</h3>
          <ul className="user-list">
            {Object.keys(users).map((user) => (
              <li key={user}>
                {user} (password: {users[user]})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
