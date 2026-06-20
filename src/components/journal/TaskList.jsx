function TaskList({
  tasks,
  setTasks,
}) {

  const addTask = () => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: "",
        time: "",
        completed: false,
      },
    ]);
  };

  const removeTask = (id) => {
    if (tasks.length === 1) return;

    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const updateTask = (id, field, value) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, [field]: value }
          : task
      )
    );
  };

  return (
    <div className="tasks-section">
      <div className="tasks-header">
        <div className="section-label">
          GOALS & TIME SPENT
        </div>

        <button
          className="add-task-btn"
          onClick={addTask}
        >
          + Add Task
        </button>
      </div>

      <div className="tasks-grid">
        {tasks.map((task) => (
          <div className="task-row" key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />

            <input
              className={`task-input ${task.completed ? "completed" : ""
                }`}
              type="text"
              value={task.text}
              placeholder="New goal..."
              onChange={(e) =>
                updateTask(task.id, "text", e.target.value)
              }
            />

            <div className="task-actions">
              <input
                className="time-input"
                type="text"
                value={task.time}
                placeholder="30m"
                onChange={(e) =>
                  updateTask(task.id, "time", e.target.value)
                }
              />

              <button
                className="delete-task"
                onClick={() => removeTask(task.id)}
                type="button"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;