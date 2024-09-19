import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../utils/api';
import '../styles/todoList.css';

const TodoList = ({ course }) => {
  const [tasks, setTasks] = useState([]);
  const userId = localStorage.getItem('userId');  // Get the user ID

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const taskData = await fetchTasks(userId);  // Fetch tasks for the logged-in user
        console.log('All fetched tasks:', taskData); // Check what tasks are returned

        // If the task has only course_id, match it to the course object
        const courseTasks = taskData.filter(task => {
          if (task.course_id) {
            // Match the course_id with the course.id
            return task.course_id === course.id;
          } else if (task.course && task.course.id) {
            return task.course.id === course.id;
          } else {
            console.warn('Task missing course or course ID:', task);
            return false;  // Skip tasks without a valid course
          }
        });

        console.log('Tasks for this course:', courseTasks); // Log tasks filtered by course
        setTasks(courseTasks);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    };
    loadTasks();
  }, [course.id, userId]);  // Fetch tasks when course or user changes

  return (
    <div className="todo-list">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className="task-item">
            <p>{task.category}: {task.description}</p>
          </div>
        ))
      ) : (
        <p>No tasks available for this course.</p>
      )}
    </div>
  );
};

export default TodoList;
