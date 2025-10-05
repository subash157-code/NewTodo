import React, { useState } from "react";
import "./TodoItem.css";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className={`todo-item ${todo.completed ? "completed" : ""}`}
      onClick={() => setShowDetails(prev => !prev)}
    >
      <div className="todo-main">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={e => {
            e.stopPropagation();
            onToggle(todo.id);
          }}
        />
        <span>{todo.text}</span>
        <small className="category">[{todo.category}]</small>
        {todo.dueDate && <small className="due">Due: {todo.dueDate}</small>}
      </div>

      <div className="todo-actions">
        <button
          className="edit-btn"
          onClick={e => {
            e.stopPropagation();
            onEdit(todo);
          }}
        >
          Edit
        </button>
        <button
          className="delete-btn"
          onClick={e => {
            e.stopPropagation();
            onDelete(todo.id);
          }}
        >
          Delete
        </button>
      </div>

      {showDetails && (
        <div className="todo-details">
          <p><strong>Task:</strong> {todo.text}</p>
          <p><strong>Category:</strong> {todo.category}</p>
          {todo.dueDate && <p><strong>Deadline:</strong> {todo.dueDate}</p>}
          <p><strong>Status:</strong> {todo.completed ? "Completed" : "Pending"}</p>
        </div>
      )}
    </div>
  );
}
