function EnergySelector({
  energy,
  setEnergy,
}) {
  return (
    <div className="footer-field">
      <label>Energy Level</label>

      <div className="energy-levels">
        {[1,2,3,4,5,6,7,8,9,10].map((n) => (
          <button
            key={n}
            type="button"
            className={
              energy === n
                ? "active"
                : ""
            }
            onClick={() =>
              setEnergy(n)
            }
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

export default EnergySelector;