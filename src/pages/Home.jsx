import "../styles/Home.css";
import { useState } from "react";

import TaskList from "../components/journal/TaskList";
import JournalForm from "../components/journal/JournalForm";
import EnergySelector from "../components/journal/EnergySelector";
import ScreenTime from "../components/journal/ScreenTime";
import Reward from "../components/journal/Reward";
import StreakCard from "../components/dashboard/StreakCard";
import ConsistencyChart from "../components/dashboard/ConsistencyChart";
import HoursChart from "../components/dashboard/HoursChart";

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
          <StreakCard
            title="Current Streak"
            value="17 Days"
          />

          <StreakCard
            title="Longest Streak"
            value="25 Days"
          />
        </div>

        <ConsistencyChart />
        <HoursChart />
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