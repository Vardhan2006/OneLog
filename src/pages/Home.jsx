import "../styles/Home.css";
import { useState } from "react";

import TaskList from "../components/journal/TaskList";
import JournalForm from "../components/journal/JournalForm";
import EnergySelector from "../components/journal/EnergySelector";
import ScreenTime from "../components/journal/ScreenTime";
import Reward from "../components/journal/Reward";

function Home() {
  const [screenTime, setScreenTime] = useState("");

  const [energy, setEnergy] = useState(5);

  const [questions, setQuestions] = useState({
    forward: "",
    obstacle: "",
    tomorrow: "",
  });

  const [reward, setReward] = useState("");

  return (
    <div className="home">
      {/* Dashboard Panel */}
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
          <div className="graph-placeholder">
            Graph — last 7 days
          </div>
        </div>

        <div className="graph-card">
          <h3>Weekly Screen Time</h3>
          <div className="graph-placeholder">
            Graph — last 7 days
          </div>
        </div>
      </div>

      {/* Journal Panel */}
      <div className="journal-panel">
        <div className="journal-inner">
          <h1 className="logo">OneLog</h1>

          <TaskList />

          <JournalForm
            questions={questions}
            setQuestions={setQuestions}
          />

          <div className="journal-footer">
            <div className="footer-fields">
              <ScreenTime
                screenTime={screenTime}
                setScreenTime={setScreenTime}
              />

              <EnergySelector
                energy={energy}
                setEnergy={setEnergy}
              />

              <Reward
                reward={reward}
                setReward={setReward}
              />
            </div>

            <button className="review-btn">
              Get AI Review →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;