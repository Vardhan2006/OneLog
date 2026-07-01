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
import { buildPrompt } from "../services/aiReview";

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

    console.log(
      "savedJournalId:",
      savedJournalId
    );

    console.log(
      "journalId:",
      journalId
    );

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

    return journalId;
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

      const { data: history } =
        await supabase
          .from("journals")
          .select(`
      id,
      journal_date,
      meaningful_thing,
      obstacle,
      tomorrow_focus,
      distraction_time,
      energy_level,
      reward,
      discipline_score,
      tasks_completed,
      yesterday_promise,
      pattern_observed,
      avoidance_detection,
      trend_vs_last_week,
      prediction,
      risk_alert,
      coach_verdict
    `)
          .order(
            "journal_date",
            { ascending: false }
          )
          .limit(7);

      const { data: taskHistory } =
        await supabase
          .from("tasks")
          .select("*");

      const memory =
        history.map((journal) => ({
          ...journal,

          tasks:
            taskHistory.filter(
              (task) =>
                task.journal_id === journal.id
            ),
        }));

      console.log(
        JSON.stringify(
          memory,
          null,
          2
        )
      );

      const currentJournal = {
        tasks,
        questions,
        screenTime,
        energy,
        reward,
      };

      const prompt =
        buildPrompt(
          currentJournal,
          history
        );

      console.log(memory);

      const currentJournalId =
        await handleSaveJournal();

      console.log(
        "saved journal:",
        currentJournalId
      );

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

  const [showReview, setShowReview] =
    useState(false);

  const [review, setReview] =
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

  const [reviewHeight,
    setReviewHeight] =
    useState(250);

  const startResize = () => {

    const move = (e) => {

      const journal =
        document.querySelector(
          ".journal-panel"
        );

      if (!journal) return;

      const rect =
        journal.getBoundingClientRect();

      const height =
        rect.bottom - e.clientY;

      if (
        height >= 200 &&
        height <= rect.height - 20
      ) {
        setReviewHeight(height);
      }
    };

    const stop = () => {
      document.removeEventListener(
        "mousemove",
        move
      );

      document.removeEventListener(
        "mouseup",
        stop
      );
    };

    document.addEventListener(
      "mousemove",
      move
    );

    document.addEventListener(
      "mouseup",
      stop
    );
  };

  const [isDragging,
    setIsDragging] =
    useState(false);

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
            value="17"
          />

          <StreakCard
            title="Longest Streak"
            value="25"
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
            </div>

            <AIReviewPanel
              open={showReview}
              review={review}
              height={reviewHeight}
              isDragging={isDragging}
              startResize={startResize}
              onClose={() =>
                setShowReview(false)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;