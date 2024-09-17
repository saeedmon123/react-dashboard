import React, { useState } from 'react';
import '../styles/addTaskForm.css'; // Import styles

const AddTaskForm = ({ courses, onAddTask, onClose }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [taskType, setTaskType] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCourse && taskType && taskDescription) {
      onAddTask(selectedCourse, taskType, taskDescription);
      setSelectedCourse('');
      setTaskType('');
      setTaskDescription('');
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <div className="add-task-form">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course:</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select a course</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Task Type:</label>
          <select
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
          >
            <option value="">Select task type</option>
            <option value="assignments">Assignments</option>
            <option value="examDates">Exam Dates</option>
            <option value="studyGoals">Study Goals</option>
          </select>
        </div>
        <div>
          <label>Task Description:</label>
          <input
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add Task</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AddTaskForm;
