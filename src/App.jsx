import { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import TaskInput from "./components/TaskInput";
import TaskStats from "./components/TaskStats";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";

function getFilterCounts(tasks) {
  return {
    all: tasks.length,
    pending: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
    high: tasks.filter((t) => t.priority === "high" && !t.completed).length,
  };
}

export default function App() {
  const [filter, setFilter] = useState("all");
  const {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    updateTask,
    clearCompleted,
    getStats,
  } = useTasks();

  const stats = getStats();
  const filterCounts = getFilterCounts(tasks);

  return (
    <div className="app-wrapper">
      <div className="app-card">
        {/* Header */}
        <header className="app-header">
          <h1 className="app-title">Task Manager</h1>
          <p className="app-subtitle">
            {stats.total === 0
              ? "Add your first task below"
              : `${stats.completed} of ${stats.total} completed`}
          </p>
        </header>

        {/* Stats + Progress */}
        <TaskStats stats={stats} />

        {/* Add Task */}
        <TaskInput onAdd={addTask} />

        {/* Filters */}
        <TaskFilters
          active={filter}
          onChange={setFilter}
          counts={filterCounts}
        />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          filter={filter}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onUpdate={updateTask}
        />

        {/* Footer actions */}
        {stats.completed > 0 && (
          <div className="app-footer">
            <button className="clear-btn" onClick={clearCompleted}>
              Clear {stats.completed} completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
