import { useState } from "react";

function TaskItem({ task, deleteTask, toggleTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    editTask(task.id, newText);
    setIsEditing(false);
  };

  return (
    <div style={{
      background: task.completed ? "#d3f9d8" : "#ffffff",
      padding: "12px",
      marginTop: "12px",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }}>

      {isEditing ? (
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            style={{ flex: 1 }}
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button className="save-btn" onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start"
        }}>

          <div style={{ maxWidth: "70%" }}>
            <span
              onClick={() => toggleTask(task.id)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
                wordBreak: "break-word"
              }}
            >
              {task.text}
            </span>

            <p style={{
              fontSize: "12px",
              marginTop: "6px",
              fontWeight: "600",
              letterSpacing: "0.5px",
              color:
                task.priority === "High"
                  ? "#e74c3c"
                  : task.priority === "Medium"
                  ? "#f39c12"
                  : "#27ae60"
            }}>
              {task.priority} Priority
            </p>
          </div>

          <div>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
            <button
              className="delete-btn"
              onClick={() => {
                if (window.confirm("Delete this task?")) {
                  deleteTask(task.id);
                }
              }}
            >
              Delete
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default TaskItem;