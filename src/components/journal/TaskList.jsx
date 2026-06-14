import { useState } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Complete React Component",
      time: "1h 20m",
      completed: false,
    },
    {
      id: 2,
      text: "Solve 2 DSA Problems",
      time: "45m",
      completed: false,
    },
    {
      id: 3,
      text: "Read Documentation",
      time: "30m",
      completed: false,
    },
  ]);

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
          Goals & Time Spent
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
              className="task-input"
              type="text"
              value={task.text}
              placeholder="Enter task"
              onChange={(e) =>
                updateTask(
                  task.id,
                  "text",
                  e.target.value
                )
              }
            />

            <input
              className="time-input"
              type="text"
              value={task.time}
              placeholder="30m"
              onChange={(e) =>
                updateTask(
                  task.id,
                  "time",
                  e.target.value
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;