import TaskItem from "./TaskItem";

const EMPTY_MESSAGES = {
  all:       { icon: "✦", text: "No tasks yet — add one above." },
  pending:   { icon: "✓", text: "Nothing pending. All caught up!" },
  completed: { icon: "◎", text: "No completed tasks yet." },
  high:      { icon: "◈", text: "No high priority tasks." },
};

function filterTasks(tasks, filter) {
  switch (filter) {
    case "completed": return tasks.filter((t) => t.completed);
    case "pending":   return tasks.filter((t) => !t.completed);
    case "high":      return tasks.filter((t) => t.priority === "high" && !t.completed);
    default:          return tasks;
  }
}

export default function TaskList({ tasks, filter, onToggle, onDelete, onUpdate }) {
  const visible = filterTasks(tasks, filter);
  const empty = EMPTY_MESSAGES[filter] || EMPTY_MESSAGES.all;

  if (visible.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">{empty.icon}</span>
        <p className="empty-text">{empty.text}</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {visible.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
