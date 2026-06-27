function AIReviewPanel({
  open,
  review,
  onClose,
}) {
  return (
    <div
      className={`review-panel ${
        open ? "open" : ""
      }`}
    >
      <div className="review-handle"></div>

      <div className="review-header">
        <h2>AI Coach Review</h2>

        <button
          className="close-review"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <div className="review-grid">

        <div className="review-card">
          <h3>Discipline Score</h3>
          <p>{review.disciplineScore}/100</p>
        </div>

        <div className="review-card">
          <h3>Tasks Completed</h3>
          <p>{review.tasksCompleted}</p>
        </div>

        <div className="review-card">
          <h3>Yesterday's Promise</h3>
          <p>{review.yesterdayPromise}</p>
        </div>

        <div className="review-card">
          <h3>Pattern Observed</h3>
          <p>{review.patternObserved}</p>
        </div>

        <div className="review-card">
          <h3>Avoidance Detection</h3>
          <p>{review.avoidanceDetection}</p>
        </div>

        <div className="review-card">
          <h3>Trend vs Last Week</h3>
          <p>{review.trendVsLastWeek}</p>
        </div>

        <div className="review-card">
          <h3>Prediction</h3>
          <p>{review.prediction}</p>
        </div>

        <div className="review-card">
          <h3>Risk Alert</h3>
          <p>{review.riskAlert}</p>
        </div>

        <div className="review-card full">
          <h3>Coach Verdict</h3>
          <p>{review.coachVerdict}</p>
        </div>

      </div>
    </div>
  );
}

export default AIReviewPanel;