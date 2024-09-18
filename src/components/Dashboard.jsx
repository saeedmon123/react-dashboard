import React, { useState, useEffect } from 'react';
import '../styles/dashboard.css'; // Import the dashboard styles
import AddTaskForm from './AddTaskForm'; // Import AddTaskForm
import TodoList from './TodoList'; // Import TodoList
import usePersistentState from '../hooks/usePersistentState';

const Dashboard = () => {
  const username = localStorage.getItem('username');
  const [courses, setCourses] = usePersistentState(`${username}_courses`, []);
  const [tasks, setTasks] = usePersistentState(`${username}_tasks`, {});
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem(`${username}_courses`)) || [];
    const savedTasks = JSON.parse(localStorage.getItem(`${username}_tasks`)) || {};
    setCourses(savedCourses);
    setTasks(savedTasks);
  }, [username, setCourses, setTasks]);

  const handleShowAddTaskForm = () => {
    setShowAddTaskForm(true);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your courses and tasks?')) {
      setCourses([]);
      setTasks({});
      localStorage.removeItem(`${username}_courses`);
      localStorage.removeItem(`${username}_tasks`);
    }
  };

  return (
    <div className="dashboard">
      <h2>{`${username}'s Dashboard`}</h2>
      <button onClick={handleReset} className="reset-button">Reset Courses and Tasks</button>
      <button onClick={handleShowAddTaskForm} className="add-task-button">Add Task</button>

      {showAddTaskForm && (
        <AddTaskForm
          courses={courses}
          onAddTask={(course, category, task) => {
            setTasks(prevTasks => {
              const updatedTasks = {
                ...prevTasks,
                [course]: {
                  ...prevTasks[course],
                  [category]: [...(prevTasks[course]?.[category] || []), task],
                },
              };
              localStorage.setItem(`${username}_tasks`, JSON.stringify(updatedTasks));
              return updatedTasks;
            });
            setShowAddTaskForm(false);
          }}
          onClose={() => setShowAddTaskForm(false)}
        />
      )}

      {courses.map(course => (
        <TodoList key={course} course={course} tasks={tasks[course] || {}} />
      ))}
    </div>
  );
};

export default Dashboard;
