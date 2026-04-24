import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([
      ...tasks,
      { id: Date.now(), text: task, completed: false }
    ]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, text: newText } : t
      )
    );
  };

  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });
  

  return (
    <div className="container">
      <h1>Task Tracker</h1>
      <Header />
      <TaskForm addTask={addTask} />

      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <p style={{ marginTop: "10px" }}>
        Total: {tasks.length} | Completed: {tasks.filter(t => t.completed).length}
      </p>

      <button onClick={() => setTasks([])}>Clear All</button>

      <TaskList 
        tasks={filteredTasks}
        deleteTask={deleteTask} 
        toggleTask={toggleTask}
        editTask={editTask}
      />
    </div>
  );
}

export default App;
