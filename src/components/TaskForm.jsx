import { useState } from "react";

function TaskForm({ addTask }) {
  const [task, setTask] = useState("");

  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.trim()) return;

    addTask(task, priority);
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
      <input
        type="text"
        placeholder="Enter task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <button type="submit" style={{ marginLeft: "10px" }}>
        Add
      </button>
    </form>
  );
}

export default TaskForm;