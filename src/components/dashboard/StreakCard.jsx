function StreakCard({ title, value }) {
  return (
    <div className="stat">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

export default StreakCard;