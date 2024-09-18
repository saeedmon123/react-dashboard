import React from 'react';
import '../styles/todoList.css'; // Assuming this is where styles are

const TodoList = ({ course, tasks }) => {
  const categories = [
    { name: 'assignments', displayName: 'Assignments' },
    { name: 'examDates', displayName: 'Exam Dates' },
    { name: 'studyGoals', displayName: 'Study Goals' },
  ];

  // Filter out empty categories
  const nonEmptyCategories = categories.filter(category => tasks[category.name] && tasks[category.name].length > 0);

  if (nonEmptyCategories.length === 0) {
    // Don't render anything if there are no tasks
    return null;
  }

  return (
    <div className="task-row">
      {nonEmptyCategories.map(category => (
        <div key={category.name} className="task-item">
          <div className="course-name">{course}</div>
          <div className="category-name">{category.displayName}</div>
          <div className="tasks-list">
            {tasks[category.name].map((task, index) => (
              <span key={index} className="task">{task}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
