import React, { useState, useEffect } from 'react';
import { createUser, fetchUsers } from '../utils/api';  // Import fetchUsers
import '../styles/adminDashboard.css';

const AdminDashboard = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [users, setUsers] = useState([]);  // State to store users

  // Fetch users on component mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();  // Fetch users from the API
        setUsers(usersData);  // Store users in state
      } catch (error) {
        console.error('Failed to load users:', error);
      }
    };

    loadUsers();
  }, [successMessage]);  // Refetch users when a user is successfully added

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await createUser(newUsername, newPassword);
      setSuccessMessage(`User ${newUsername} added successfully.`);
      setNewUsername('');  // Clear the input
      setNewPassword('');  // Clear the input
      setErrorMessage('');  // Clear any previous errors
    } catch (error) {
      const backendMessage = error.response && error.response.data.error
        ? error.response.data.error  // Handle "username already exists" message
        : error.message;
      setErrorMessage(`Failed to add user. ${backendMessage}`);
      setSuccessMessage('');  // Clear success message
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleAddUser}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add User</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>

      {/* Display the list of users */}
      <div>
        <h3>Existing Users</h3>
        <ul>
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.id}>{user.username}</li>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
