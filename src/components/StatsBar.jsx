// StatsBar.jsx - summary statistics
import React from "react";

function StatsBar({ summary }) {
  const { total, totalViews, top } = summary;
  const items = [
    { label: "Total Articles", value: total },
    { label: "Total Views", value: totalViews.toLocaleString() },
    { label: "Top Article", value: top ? top.title : "-" },
  ];
  return (
    <section aria-label="Summary statistics" className="stats-bar">
      {items.map((item) => (
        <div className="stat-card" key={item.label}>
          <span className="stat-value">{item.value}</span>
          <span className="stat-label">{item.label}</span>
        </div>
      ))}
    </section>
  );
}

export default React.memo(StatsBar);
