import HistoricalBugCard from "./HistoricalBugCard";

const HistoricalBugList = ({ bugs }) => {
  if (!bugs || bugs.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">✓</div>
        <h3>No historical bugs found</h3>
        <p>
          There are no previous bugs available in this Jira project.
        </p>
      </div>
    );
  }

  return (
    <div className="bug-list">
      {bugs.map((bug) => (
        <HistoricalBugCard key={bug.id} bug={bug} />
      ))}
    </div>
  );
};

export default HistoricalBugList;