import "../styles/Home.css";
import { useState } from "react";

import { supabase } from "../services/supabase";
import TaskList from "../components/journal/TaskList";
import JournalForm from "../components/journal/JournalForm";
import EnergySelector from "../components/journal/EnergySelector";
import ScreenTime from "../components/journal/ScreenTime";
import Reward from "../components/journal/Reward";
import StreakCard from "../components/dashboard/StreakCard";
import ConsistencyChart from "../components/dashboard/ConsistencyChart";
import HoursChart from "../components/dashboard/HoursChart";

function Home() {

  const handleReview = async () => {
    const { data, error } = await supabase
      .from("journals")
      .insert([
        {
          journal_date: new Date()
            .toISOString()
            .split("T")[0],

          meaningful_thing:
            questions.forward,

          obstacle:
            questions.obstacle,

          tomorrow_focus:
            questions.tomorrow,

          distraction_time:
            screenTime,

          energy_level:
            energy,

          reward:
            reward,
        },
      ])
      .select();

    console.log("DATA:", data);
    console.log(JSON.stringify(error, null, 2));
  };

  const [screenTime, setScreenTime] = useState("");

  const [energy, setEnergy] = useState(5);

  const [questions, setQuestions] = useState({
    forward: "",
    obstacle: "",
    tomorrow: "",
  });

  const [reward, setReward] = useState("");

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Learn Recursions",
      time: "1h 20m",
      completed: false,
    },
    {
      id: 2,
      text: "GYM",
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

          <TaskList
            tasks={tasks}
            setTasks={setTasks}
          />

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

            <button
              className="review-btn"
              onClick={handleReview}
            >
              Get AI Review →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;