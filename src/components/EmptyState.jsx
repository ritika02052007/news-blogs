// EmptyState.jsx - friendly "No data found" message
import React from "react";

function EmptyState({ message }) {
  return (
    <section role="status" aria-live="polite" className="card state">
      <h2>No data found</h2>
      <p>{message}</p>
    </section>
  );
}

export default React.memo(EmptyState);
