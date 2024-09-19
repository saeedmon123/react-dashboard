import React, { useState } from 'react';
import { createTask } from '../utils/api';
import '../styles/addTaskForm.css';

const AddTaskForm = ({ courses, onClose, refreshTasks }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const userId = localStorage.getItem('userId');  // Get the user ID from localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourse || !category || !description.trim()) {
      alert('Please fill all fields.');
      return;
    }
    try {
      await createTask(userId, selectedCourse, category, description);  // Pass user ID to createTask
      window.location.reload();  // Force a full page refresh after task is addedlose the form after submission
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <div className="add-task-form">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <label>Course:</label>
        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>{course.name}</option>
          ))}
        </select>

        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select category</option>
          <option value="assignments">Assignments</option>
          <option value="exam_dates">Exam Dates</option>
          <option value="study_goals">Study Goals</option>
        </select>

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <button type="submit">Add Task</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AddTaskForm;
