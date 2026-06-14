import "../styles/Home.css";
import TaskList from "../components/journal/TaskList";

function Home() {
  return (
    <div className="home">

      {/* ── Dashboard Panel (unchanged) ── */}
      <div className="dashboard-panel">

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
          <div className="graph-placeholder">Graph — last 7 days</div>
        </div>

        <div className="graph-card">
          <h3>Weekly Screen Time</h3>
          <div className="graph-placeholder">Graph — last 7 days</div>
        </div>
      </div>

      {/* ── Journal Panel ── */}
      <div className="journal-panel">
        <div className="journal-inner">
          <h1 className="logo">OneLog</h1>

          {/* Tasks */}
          <TaskList />

          {/* 3 questions in a row */}
          <div className="questions-grid">
            <div className="q-group">
              <label>What's the meaningful thing you did?</label>
              <textarea rows="4" placeholder="Write here…" />
            </div>
            <div className="q-group">
              <label>What's got in your way today?</label>
              <textarea rows="4" placeholder="Write here…" />
            </div>
            <div className="q-group">
              <label>What's matters the most tomorrow?</label>
              <textarea rows="4" placeholder="Write here…" />
            </div>
          </div>

          {/* Footer */}
          <div className="journal-footer">
            <div className="footer-fields">

              <div className="footer-field">
                <label>Screen Time</label>
                <input type="text" placeholder="e.g. 5h 30m" />
              </div>

              <div className="footer-field">
                <label>Energy Level</label>
                <div className="energy-levels">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <button key={n} type="button">{n}</button>
                  ))}
                </div>
              </div>

            </div>

            <button className="review-btn">Get AI Review →</button>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Home;