import React, { useEffect, useState, useCallback } from 'react';
import { fetchCourses, fetchTasks, createCourse } from '../utils/api';
import AddTaskForm from './AddTaskForm';
import TodoList from './TodoList';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');  // Get user ID from localStorage

  const loadCoursesAndTasks = useCallback(async () => {
    if (!userId) {
      setError('User ID not found. Please log in again.');
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const courseData = await fetchCourses(userId);
      setCourses(courseData);
      
      const taskData = await fetchTasks(userId);
      setTasks(taskData);  // Fetch and set the tasks
    } catch (error) {
      setError('Failed to fetch courses and tasks. Please try again.');
      console.error('Failed to fetch courses and tasks:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadCoursesAndTasks();  // Load courses and tasks when the component is mounted
  }, [loadCoursesAndTasks]);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!courseName.trim()) {
      setError('Course name cannot be empty.');
      return;
    }
    try {
      const newCourse = await createCourse(userId, courseName);
      setCourses([...courses, newCourse]);
      setCourseName('');
      setError(null);  // Clear any error on success
    } catch (error) {
      setError('Failed to create course. Please try again.');
      console.error('Failed to create course:', error);
    }
  };

  const refreshTasks = async () => {
    try {
      const taskData = await fetchTasks(userId);  // Fetch the latest tasks
      setTasks(taskData);  // Update the tasks state
    } catch (error) {
      console.error('Failed to refresh tasks:', error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Your Dashboard</h2>
      
      {/* Course Creation Form */}
      <form onSubmit={handleCreateCourse} className="create-course-form">
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <button type="submit">Add Course</button>
      </form>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Add Task Button */}
      <button onClick={() => setShowAddTaskForm(true)} className="add-task-button">
        Add Task
      </button>

      {/* Task Form */}
      {showAddTaskForm && (
        <AddTaskForm 
          courses={courses} 
          onClose={() => setShowAddTaskForm(false)} 
          refreshTasks={refreshTasks}  // Pass the refreshTasks function to the AddTaskForm
        />
      )}

      {/* Loading Indicator */}
      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <div className="course-list">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="course-item">
                <h3>{course.name}</h3>
                <TodoList 
                  course={course} 
                  tasks={tasks.filter(task => task.course_id === course.id)}  // Filter tasks by course
                />
              </div>
            ))
          ) : (
            <p>No courses available. Please add a course.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
