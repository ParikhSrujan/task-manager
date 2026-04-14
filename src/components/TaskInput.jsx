import { useState } from "react";

export default function TaskInput({ onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [due, setDue] = useState("");

  const handleSubmit = () => {
    const success = onAdd({ text, priority, due });
    if (success) {
      setText("");
      setDue("");
      setPriority("medium");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="input-section">
      <div className="input-row">
        <input
          type="text"
          className="task-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
          autoComplete="off"
        />
        <button className="add-btn" onClick={handleSubmit}>
          Add
        </button>
      </div>

      <div className="meta-row">
        <select
          className="meta-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="high">🔴 High priority</option>
          <option value="medium">🟡 Medium priority</option>
          <option value="low">🟢 Low priority</option>
        </select>
        <input
          type="date"
          className="meta-date"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />
      </div>
    </div>
  );
}
