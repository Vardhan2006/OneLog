import "../styles/Home.css";

function Home() {
  return (
    <div className="home">
      {/* Dashboard */}
      <div className="dashboard-panel">
        <h1 className="logo">OneLog</h1>

        <div className="stat-section">
          <div className="stat">
            <h3>Current Streak</h3>
            <p>17 Days</p>
          </div>

          <div className="stat">
            <h3>Longest Streak</h3>
            <p>25 Days</p>
          </div>
        </div>

        <div className="graph-card">
          <h3>Weekly Consistency</h3>
          <div className="graph-placeholder">
            Graph Coming Soon
          </div>
        </div>

        <div className="graph-card">
          <h3>Weekly Hours</h3>
          <div className="graph-placeholder">
            Graph Coming Soon
          </div>
        </div>
      </div>

      {/* Journal */}
      <div className="journal-panel">
        <h1>Daily Reflection</h1>

        <div className="form-group">
          <label>Tasks</label>

          <div className="task">
            <input type="checkbox" />
            <span>Complete React Component</span>
          </div>

          <div className="task">
            <input type="checkbox" />
            <span>Solve 2 DSA Problems</span>
          </div>

          <div className="task">
            <input type="checkbox" />
            <span>Read Documentation</span>
          </div>

          <button className="secondary-btn">
            + Add Task
          </button>
        </div>

        <div className="form-group">
          <label>1. What was the most meaningful thing you did today?</label>
          <textarea rows="3"></textarea>
        </div>

        <div className="form-group">
          <label>What got in your way today?</label>
          <textarea rows="3"></textarea>
        </div>

        <div className="form-group">
          <label>What matters most tomorrow?</label>
          <textarea rows="3"></textarea>
        </div>

        <div className="form-group">
          <label>Screen Time</label>
          <input
            type="text"
            placeholder="e.g. 5 hours"
          />
        </div>

        <div className="form-group">
          <label>Energy Level</label>

          <div className="energy-levels">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button>10</button>
          </div>
        </div>

        <button className="review-btn">
          Get AI Review
        </button>
      </div>
    </div>
  );
}

export default Home;