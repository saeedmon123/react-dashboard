import React, { useState, useEffect } from 'react';
import '../styles/dashboard.css'; // Import the dashboard styles
import AddTaskForm from './AddTaskForm'; // Import AddTaskForm
import TodoList from './TodoList'; // Import TodoList
import CourseInputForm from './CourseInputForm'; // Import CourseInputForm
import usePersistentState from '../hooks/usePersistentState';

const Dashboard = () => {
  const username = localStorage.getItem('username');
  const [courses, setCourses] = usePersistentState(`${username}_courses`, []);
  const [tasks, setTasks] = usePersistentState(`${username}_tasks`, {});
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [showCourseInputForm, setShowCourseInputForm] = useState(false); // Control course input form visibility

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem(`${username}_courses`)) || [];
    const savedTasks = JSON.parse(localStorage.getItem(`${username}_tasks`)) || {};
    setCourses(savedCourses);
    setTasks(savedTasks);
  }, [username, setCourses, setTasks]);

  const addTask = (course, category, task) => {
    setTasks(prevTasks => {
      const courseTasks = prevTasks[course] || {};
      const updatedCategoryTasks = courseTasks[category]
        ? [...courseTasks[category], task]
        : [task];
      const updatedTasks = {
        ...prevTasks,
        [course]: {
          ...courseTasks,
          [category]: updatedCategoryTasks
        }
      };
      localStorage.setItem(`${username}_tasks`, JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const handleCourseSubmit = (newCourses) => {
    setCourses(newCourses);
    localStorage.setItem(`${username}_courses`, JSON.stringify(newCourses));
    setShowCourseInputForm(false); // Hide the form after adding courses
  };

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

      {/* Show the Add Course button if no courses exist */}
      {courses.length === 0 && !showCourseInputForm && (
        <>
          <p>No courses available. Please add courses to get started.</p>
          <button onClick={() => setShowCourseInputForm(true)} className="add-course-button">
            Add Courses
          </button>
        </>
      )}

      {/* Show the Course Input Form if the Add Course button is clicked */}
      {showCourseInputForm && (
        <CourseInputForm onSubmit={handleCourseSubmit} />
      )}

      {/* If courses exist, show tasks and the option to add more tasks */}
      {courses.length > 0 && (
        <>
          <button onClick={handleShowAddTaskForm} className="add-task-button">Add Task</button>
          {showAddTaskForm && (
            <AddTaskForm
              courses={courses}
              onAddTask={(course, category, task) => {
                addTask(course, category, task);
                setShowAddTaskForm(false);
              }}
              onClose={() => setShowAddTaskForm(false)}
            />
          )}

          <div className="course-list">
            {courses.map(course => (
              <div className="course-card" key={course}>
                <h3>{course}</h3>
                <TodoList course={course} tasks={tasks[course] || {}} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
