const HistoricalBugCard = ({ bug }) => {
  const fields = bug.fields;

  const createdDate = fields.created
    ? new Date(fields.created).toLocaleDateString()
    : "Unknown";

  return (
    <article className="bug-card">
      <div className="bug-card-header">
        <span className="bug-key">{bug.key}</span>

        <span className="bug-status">
          {fields.status?.name || "Unknown"}
        </span>
      </div>

      <h3>{fields.summary}</h3>

      <div className="bug-details">
        <span>{fields.issuetype?.name || "Bug"}</span>
        <span>Created: {createdDate}</span>
      </div>

      {fields.labels?.length > 0 && (
        <div className="bug-labels">
          {fields.labels.map((label) => (
            <span key={label} className="label-chip">
              {label}
            </span>
          ))}
        </div>
      )}
    </article>
  );
};

export default HistoricalBugCard;