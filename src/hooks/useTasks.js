import { useLocalStorage } from "./useLocalStorage";

const SAMPLE_TASKS = [
  {
    id: 1,
    text: "Build portfolio website",
    priority: "high",
    due: "2026-04-20",
    completed: false,
    createdAt: Date.now(),
  },
  {
    id: 2,
    text: "Review open pull requests",
    priority: "medium",
    due: "2026-04-13",
    completed: true,
    createdAt: Date.now() - 86400000,
  },
  {
    id: 3,
    text: "Update resume skills section",
    priority: "high",
    due: "2026-04-25",
    completed: false,
    createdAt: Date.now() - 172800000,
  },
  {
    id: 4,
    text: "Read React performance docs",
    priority: "low",
    due: "",
    completed: false,
    createdAt: Date.now() - 259200000,
  },
];

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage("tm-tasks-v2", SAMPLE_TASKS);

  const addTask = ({ text, priority, due }) => {
    if (!text.trim()) return false;
    const newTask = {
      id: Date.now(),
      text: text.trim(),
      priority,
      due,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
    return true;
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const updateTask = (id, text) => {
    if (!text.trim()) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: text.trim() } : t))
    );
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const percent = total ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pending, percent };
  };

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    updateTask,
    clearCompleted,
    getStats,
  };
}
