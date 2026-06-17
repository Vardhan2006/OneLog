function ScreenTime({
  screenTime,
  setScreenTime,
}) {
  return (
    <div className="footer-field">
      <label>Distraction Time</label>

      <input
        type="text"
        placeholder="e.g. 2h"
        value={screenTime}
        onChange={(e) =>
          setScreenTime(e.target.value)
        }
      />
    </div>
  );
}

export default ScreenTime;