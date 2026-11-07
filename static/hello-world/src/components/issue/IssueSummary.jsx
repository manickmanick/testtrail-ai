const IssueSummary = ({ issue }) => {
  if (!issue) {
    return null;
  }

  return (
    <section className="issue-summary">
      <div className="issue-header">
        <span className="issue-key">{issue.issueKey}</span>

        <span className="issue-status">{issue.status}</span>
      </div>

      <h2>{issue.summary}</h2>

      <div className="issue-metadata">
        <span>{issue.issueType}</span>

        {issue.components.map((component) => (
          <span key={component}>{component}</span>
        ))}
      </div>

      {issue.description && (
        <div className="issue-description">
          <h4>Description</h4>
          <p>{issue.description}</p>
        </div>
      )}

      {issue.labels.length > 0 && (
        <div className="issue-labels">
          {issue.labels.map((label) => (
            <span className="label-chip" key={label}>
              {label}
            </span>
          ))}
        </div>
      )}
    </section>
  );
};

export default IssueSummary;
