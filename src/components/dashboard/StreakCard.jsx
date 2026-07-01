function StreakCard({ title, value }) {
  return (
    <div className="stat">

      <div className="stat-left">
        <h3>{title}</h3>
      </div>

      <div className="stat-right">
        {value}
      </div>

    </div>
  );
}

export default StreakCard;