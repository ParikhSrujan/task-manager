import { useState } from "react";

const PRIORITY_CONFIG = {
  high:   { label: "High",   className: "badge--high" },
  medium: { label: "Med",    className: "badge--medium" },
  low:    { label: "Low",    className: "badge--low" },
};

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function isOverdue(dateStr) {
  if (!dateStr) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateStr + "T00:00:00") < today;
}

export default function TaskItem({ task, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(task.id, editText);
    } else {
      setEditText(task.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  const overdue = isOverdue(task.due) && !task.completed;
  const priorityCfg = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium;

  return (
    <div className={`task-item ${task.completed ? "task-item--done" : ""}`}>
      {/* Checkbox */}
      <button
        className={`task-check ${task.completed ? "task-check--done" : ""}`}
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
      >
        {task.completed && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Body */}
      <div className="task-body">
        {isEditing ? (
          <input
            className="task-edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            autoFocus
          />
        ) : (
          <span className={`task-text ${task.completed ? "task-text--done" : ""}`}>
            {task.text}
          </span>
        )}

        <div className="task-meta">
          <span className={`priority-badge ${priorityCfg.className}`}>
            {priorityCfg.label}
          </span>
          {task.due && (
            <span className={`due-label ${overdue ? "due-label--overdue" : ""}`}>
              {overdue && "⚠ "}
              {formatDate(task.due)}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="task-actions">
        {isEditing ? (
          <button className="action-btn action-btn--save" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button
            className="action-btn action-btn--edit"
            onClick={() => {
              setEditText(task.text);
              setIsEditing(true);
            }}
            aria-label="Edit task"
          >
            Edit
          </button>
        )}
        <button
          className="action-btn action-btn--delete"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
