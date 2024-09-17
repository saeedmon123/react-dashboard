import React, { useState, useEffect } from 'react';

const CourseInputForm = ({ onSubmit }) => {
  const [numCourses, setNumCourses] = useState(0);
  const [courseNames, setCourseNames] = useState([]);

  useEffect(() => {
    // Ensure course names array is always of length numCourses
    setCourseNames(prev => Array(numCourses).fill('').map((name, i) => prev[i] || ''));
  }, [numCourses]);

  // Handle number of courses change
  const handleNumCoursesChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 0) {
      setNumCourses(value);
    }
  };

  // Handle course name change
  const handleCourseNameChange = (index, value) => {
    setCourseNames(prev => {
      const updatedCourseNames = [...prev];
      updatedCourseNames[index] = value;
      return updatedCourseNames;
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (courseNames.length === numCourses && courseNames.every(name => name.trim() !== '')) {
      onSubmit(courseNames); // Pass the courses to the parent component
    } else {
      alert('Please enter all course names.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <button type="submit">Save Courses</button>
    </form>
  );
};

export default CourseInputForm;
