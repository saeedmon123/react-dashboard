import React from 'react';

const TodoList = ({ course, tasks }) => {
  const categories = ['assignments', 'examDates', 'studyGoals'];

  if (!tasks || Object.keys(tasks).length === 0) {
    return <p>No tasks available for {course}. Add tasks to see them here.</p>;
  }

  return (
    <div>
      {categories.map(category => (
        <div key={category}>
          <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
          {tasks[category] && tasks[category].length > 0 ? (
            <ul>
              {tasks[category].map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          ) : (
            <p>No tasks for this category.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
