import React, { useState, useEffect } from 'react';
import { createCourse } from '../utils/api'; // Import the createCourse function
import '../styles/courseInputForm.css'; // Import styles

const CourseInputForm = ({ userId, onCourseAdded }) => {  // Added userId and callback for course added
  const [numCourses, setNumCourses] = useState(0);
  const [courseNames, setCourseNames] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Ensure course names array is always of length numCourses
    setCourseNames(prev => Array(numCourses).fill('').map((name, i) => prev[i] || ''));
  }, [numCourses]);

  const handleNumCoursesChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 0) {
      setNumCourses(value);
    }
  };

  const handleCourseNameChange = (index, value) => {
    setCourseNames(prev => {
      const updatedCourseNames = [...prev];
      updatedCourseNames[index] = value;
      return updatedCourseNames;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (courseNames.length === numCourses && courseNames.every(name => name.trim() !== '')) {
      setIsSubmitting(true);
      try {
        // Loop through all course names and submit each one to the backend
        for (let courseName of courseNames) {
          await createCourse(userId, courseName); // API call to create course
        }
        // Trigger callback after courses are successfully added
        onCourseAdded(); // Use callback to update the course list
        setCourseNames([]); // Clear the course names after submission
        setNumCourses(0);   // Reset the number of courses
      } catch (error) {
        console.error('Error adding courses:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert('Please enter all course names.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="course-input-form">
      <h2>Add Courses</h2>
      <label>
        Number of Courses:
        <input
          type="number"
          value={numCourses}
          onChange={handleNumCoursesChange}
          min="0"
        />
      </label>

      {Array.from({ length: numCourses }).map((_, index) => (
        <div key={index}>
          <label>
            Course {index + 1} Name:
            <input
              type="text"
              value={courseNames[index] || ''}
              onChange={e => handleCourseNameChange(index, e.target.value)}
            />
          </label>
        </div>
      ))}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Courses'}
      </button>
    </form>
  );
};

export default CourseInputForm;
