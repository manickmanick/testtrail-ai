const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="error-state">
      <div className="error-icon">!</div>

      <h3>Something went wrong</h3>

      <p>{message}</p>

      {onRetry && (
        <button className="retry-button" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
