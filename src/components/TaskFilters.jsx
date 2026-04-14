const FILTERS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "completed", label: "Completed" },
  { key: "high", label: "High Priority" },
];

export default function TaskFilters({ active, onChange, counts }) {
  return (
    <div className="filters-row">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          className={`filter-btn ${active === key ? "filter-btn--active" : ""}`}
          onClick={() => onChange(key)}
        >
          {label}
          {counts[key] !== undefined && (
            <span className="filter-count">{counts[key]}</span>
          )}
        </button>
      ))}
    </div>
  );
}
