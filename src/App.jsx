// import { useState } from "react";
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

  const filterRef = useRef(null);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilterMenu(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addTask = (task, priority) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        completed: false,
        priority: priority
      }
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
  const [sortType, setSortType] = useState("none");

  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    if (filter === "high") return task.priority === "High";
    if (filter === "medium") return task.priority === "Medium";
    if (filter === "low") return task.priority === "Low";
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortType === "priority") {
      const order = { High: 1, Medium: 2, Low: 3 };
      return order[a.priority] - order[b.priority];
    }
    if (sortType === "latest") {
      return b.id - a.id;
    }
    return 0;
  });

  return (
    <div className="container">
      <h1 style={{ marginBottom: "10px" }}>Task Tracker</h1>
      <Header />
      <TaskForm addTask={addTask} />

      {/* TOP BAR */}
      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>

        {/* FILTER */}
        <div style={{ position: "relative" }} ref={filterRef}>
          <button onClick={() => {
            setShowFilterMenu(!showFilterMenu);
            setShowSortMenu(false);
          }}>
            Filter ⚙
          </button>

          {showFilterMenu && (
            <div style={{
              position: "absolute",
              top: "100%",
              left: "0",
              background: "white",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
              marginTop: "5px"
            }}>
              <p className="menu-item" onClick={() => { setFilter("high"); setShowFilterMenu(false); }}>High</p>
              <p className="menu-item" onClick={() => { setFilter("medium"); setShowFilterMenu(false); }}>Medium</p>
              <p className="menu-item" onClick={() => { setFilter("low"); setShowFilterMenu(false); }}>Low</p>
            </div>
          )}
        </div>

        {/* SORT */}
        <div style={{ position: "relative" }} ref={sortRef}>
          <button onClick={() => {
            setShowSortMenu(!showSortMenu);
            setShowFilterMenu(false);
          }}>
            Sort ⬇
          </button>

          {showSortMenu && (
            <div style={{
              position: "absolute",
              top: "100%",
              left: "0",
              background: "white",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
              marginTop: "5px"
            }}>
              <p className="menu-item" onClick={() => { setSortType("none"); setShowSortMenu(false); }}>Default</p>
              <p className="menu-item" onClick={() => { setSortType("priority"); setShowSortMenu(false); }}>Priority</p>
              <p className="menu-item" onClick={() => { setSortType("latest"); setShowSortMenu(false); }}>Latest</p>
            </div>
          )}
        </div>
      </div>

      <p style={{ marginTop: "10px", fontWeight: "bold" }}>
        Total: {tasks.length} | Completed: {tasks.filter(t => t.completed).length}
      </p>

      <button
        onClick={() => {
          if (window.confirm("Clear all tasks?")) {
            setTasks([]);
          }
        }}
        style={{ marginTop: "10px" }}
      >
        Clear All
      </button>

      <TaskList
        tasks={sortedTasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        editTask={editTask}
      />
    </div>
  );
}

export default App;
