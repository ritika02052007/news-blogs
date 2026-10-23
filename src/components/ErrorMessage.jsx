// ErrorMessage.jsx - error with retry button
import React from "react";

function ErrorMessage({ message, onRetry }) {
  return (
    <section role="alert" className="card state error">
      <h2>Something went wrong</h2>
      <p>{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry}>
          Retry
        </button>
      )}
    </section>
  );
}

export default React.memo(ErrorMessage);
