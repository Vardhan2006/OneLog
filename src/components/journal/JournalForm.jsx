

function JournalForm({
  screenTime,
  setScreenTime,
  questions,
  setQuestions,
}) {
  const handleQuestionChange = (field, value) => {
    setQuestions({
      ...questions,
      [field]: value,
    });
  };
  
  return (
    <>
      <div className="questions-grid">
        <div className="q-group">
          <label>What's the meaningful thing you did?</label>

          <textarea
            rows="4"
            placeholder="Write here…"
            value={questions.forward}
            onChange={(e) =>
              handleQuestionChange(
                "forward",
                e.target.value
              )
            }
          />
        </div>

        <div className="q-group">
          <label>What's got in your way today?</label>

          <textarea
            rows="4"
            placeholder="Write here…"
            value={questions.obstacle}
            onChange={(e) =>
              handleQuestionChange(
                "obstacle",
                e.target.value
              )
            }
          />
        </div>

        <div className="q-group">
          <label>What matters the most tomorrow?</label>

          <textarea
            rows="4"
            placeholder="Write here…"
            value={questions.tomorrow}
            onChange={(e) =>
              handleQuestionChange(
                "tomorrow",
                e.target.value
              )
            }
          />
        </div>
      </div>

    </>
  );
}

export default JournalForm;