import React from 'react';

const TodoItem = ({ task, onDelete }) => {
    return (
        <div className="todo-item">
            <span>{task}</span>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default TodoItem;
