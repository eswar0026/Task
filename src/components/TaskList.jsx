import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, toggleTask, editTask }) {
  if (tasks.length === 0) {
    return (
      <p style={{ 
        textAlign: "center", 
        marginTop: "20px", 
        color: "#999",
        fontStyle: "italic" 
      }}>
        🚀 No tasks yet. Add your first task!
      </p>
    );
  }
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
}

export default TaskList;