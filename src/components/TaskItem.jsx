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
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: task.completed ? "#d3f9d8" : "#f9f9f9",
      padding: "10px",
      marginTop: "10px",
      borderRadius: "5px"
    }}>
      {isEditing ? (
        <>
          <input
            style={{ flex: 1, marginRight: "10px" }}
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button className="save-btn" onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <span
            onClick={() => toggleTask(task.id)}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer"
            }}
          >
            {task.text}
          </span>

          <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
          <button className="delete-btn" onClick={() => {
            if (window.confirm("Delete this task?")) {
              deleteTask(task.id);
            }
          }}>Delete</button>
        </>
      )}
    </div>
  );
}

export default TaskItem;
