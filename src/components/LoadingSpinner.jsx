// LoadingSpinner.jsx - loading indicator
import React from "react";

function LoadingSpinner() {
  return (
    <section role="status" aria-live="polite" className="card state">
      <div className="spinner" aria-hidden="true" />
      <p>Loading articles...</p>
    </section>
  );
}

export default React.memo(LoadingSpinner);
