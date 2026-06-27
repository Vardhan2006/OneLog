import "../styles/Home.css";
import { useState, useEffect } from "react";

import { supabase } from "../services/supabase";
import TaskList from "../components/journal/TaskList";
import JournalForm from "../components/journal/JournalForm";
import EnergySelector from "../components/journal/EnergySelector";
import ScreenTime from "../components/journal/ScreenTime";
import Reward from "../components/journal/Reward";
import StreakCard from "../components/dashboard/StreakCard";
import ConsistencyChart from "../components/dashboard/ConsistencyChart";
import HoursChart from "../components/dashboard/HoursChart";
import AIReviewPanel from "../components/review/AIReviewPanel";

function Home() {

  const handleSaveJournal = async () => {
    const today = new Date()
      .toISOString()
      .split("T")[0];

    let journalId = savedJournalId;

    if (!savedJournalId) {
      const { data, error } = await supabase
        .from("journals")
        .insert([
          {
            journal_date: today,
            meaningful_thing: questions.forward,
            obstacle: questions.obstacle,
            tomorrow_focus: questions.tomorrow,
            distraction_time: screenTime,
            energy_level: energy,
            reward: reward,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error(error);
        return;
      }

      journalId = data.id;
      setSavedJournalId(journalId);
    } else {
      const { error } = await supabase
        .from("journals")
        .update({
          meaningful_thing: questions.forward,
          obstacle: questions.obstacle,
          tomorrow_focus: questions.tomorrow,
          distraction_time: screenTime,
          energy_level: energy,
          reward: reward,
        })
        .eq("id", savedJournalId);

      if (error) {
        console.error(error);
        return;
      }

      const { error: deleteError } =
        await supabase
          .from("tasks")
          .delete()
          .eq("journal_id", savedJournalId);

      if (deleteError) {
        console.error(deleteError);
        return;
      }
    }

    const taskRows = tasks.map((task) => ({
      journal_id: journalId,
      task_name: task.text,
      time_spent: task.time,
      completed: task.completed,
    }));

    const { error: taskError } =
      await supabase
        .from("tasks")
        .insert(taskRows);

    if (taskError) {
      console.error(taskError);
      return;
    }

    alert("Journal saved!");
  };

  const loadTodayJournal = async () => {
    const today = new Date()
      .toISOString()
      .split("T")[0];

    const { data, error } = await supabase
      .from("journals")
      .select("*")
      .eq("journal_date", today)
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) return;

    setSavedJournalId(data.id);

    setQuestions({
      forward: data.meaningful_thing || "",
      obstacle: data.obstacle || "",
      tomorrow: data.tomorrow_focus || "",
    });

    setScreenTime(
      data.distraction_time || ""
    );

    setEnergy(
      data.energy_level || 5
    );

    setReward(
      data.reward || ""
    );

    const {
      data: taskData,
      error: taskError,
    } = await supabase
      .from("tasks")
      .select("*")
      .eq("journal_id", data.id);

    if (!taskError && taskData) {
      setTasks(
        taskData.map((task) => ({
          id: task.id,
          text: task.task_name,
          time: task.time_spent,
          completed: task.completed,
        }))
      );
    }
  };

  const handleReview =
    async () => {

      await handleSaveJournal();

      setShowReview(true);
    };

  const [screenTime, setScreenTime] = useState("");

  const [energy, setEnergy] = useState(5);

  const [questions, setQuestions] = useState({
    forward: "",
    obstacle: "",
    tomorrow: "",
  });

  const [reward, setReward] = useState("");

  const [savedJournalId, setSavedJournalId] =
    useState(null);

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

  const [showReview,
    setShowReview] =
    useState(false);

  const [review,
    setReview] =
    useState({
      disciplineScore: 78,
      tasksCompleted: "3/5",
      yesterdayPromise:
        "❌ React Authentication",

      patternObserved:
        "Less productive after 7 PM",

      avoidanceDetection:
        "DSA postponed for 6 days",

      trendVsLastWeek:
        "+18% productive hours",

      prediction:
        "Likely to postpone DSA",

      riskAlert:
        "Screen time increasing",

      coachVerdict:
        "Start tomorrow with DSA."
    });

  useEffect(() => {
    loadTodayJournal();
  }, []);

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

            <div className="action-buttons">
              <button
                className="save-btn"
                onClick={handleSaveJournal}
              >
                Save Journal
              </button>

              <button
                className="review-btn"
                onClick={handleReview}
              >
                Get AI Review →
              </button>

              <AIReviewPanel
                open={showReview}
                review={review}
                onClose={() =>
                  setShowReview(false)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;