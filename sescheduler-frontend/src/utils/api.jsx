import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/scheduler/';
export const loginUser = async (username, password) => {
  try {
    // Send the username and password as query parameters
    const response = await axios.post(`${API_URL}login/`, null, {
      params: {
        username,  // Query parameter: username
        password   // Query parameter: password
      }
    });

    const user = response.data;

    if (user.error) {
      throw new Error(user.error);
    }

    return user;  // Return user data if successful
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
};
// Fetch all courses for a user
export const fetchCourses = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}courses/`, { params: { user_id: userId } });
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};
export const createCourse = async (userId, courseName) => {
  try {
    // Use query parameters to send the data
    const response = await axios.post(`${API_URL}courses/`, null, {
      params: {
        name: courseName,
        user_id: userId  // Send userId as a query parameter
      }
    });

    console.log('Course created successfully:', response.data);  // Log response
    return response.data;  // Return the new course data
  } catch (error) {
    console.error('Error creating course:', error.response ? error.response.data : error.message);
    throw error;
  }
};


// Create a new task for a specific user
export const createTask = async (userId, courseId, category, description) => {
  try {
    const response = await axios.post(`${API_URL}tasks/`, {
      user_id: userId,  // Pass user_id in the request body
      course_id: courseId,
      category,
      description
    });
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const fetchTasks = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}tasks/`, { params: { user_id: userId } });
    return response.data; // Ensure this returns the correct task data for the user
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};
// Delete a task by its ID
export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${API_URL}tasks/${taskId}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

// Fetch all users (for the admin dashboard)
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}users/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Create a new user
export const createUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}users/`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error.response ? error.response.data : error.message);
    throw error;
  }
};
