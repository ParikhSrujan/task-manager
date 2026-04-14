export default function TaskStats({ stats }) {
  const { total, completed, pending, percent } = stats;

  return (
    <div className="stats-section">
      <div className="stats-chips">
        <div className="stat-chip">
          <span className="stat-num">{total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-chip stat-chip--done">
          <span className="stat-num">{completed}</span>
          <span className="stat-label">Done</span>
        </div>
        <div className="stat-chip stat-chip--pending">
          <span className="stat-num">{pending}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-chip stat-chip--pct">
          <span className="stat-num">{percent}%</span>
          <span className="stat-label">Progress</span>
        </div>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
