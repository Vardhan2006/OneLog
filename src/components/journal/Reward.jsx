function Reward({ reward, setReward }) {
  return (
    <div className="footer-field">
      <label>Reward</label>

      <input
        type="text"
        placeholder="e.g. Movie"
        value={reward}
        onChange={(e) =>
          setReward(e.target.value)
        }
      />
    </div>
  );
}

export default Reward;