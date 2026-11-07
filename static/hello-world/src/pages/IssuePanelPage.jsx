import useIssuePanelData from "../hooks/useIssuePanelData";

import IssueSummary from "../components/issue/IssueSummary";
import HistoricalBugList from "../components/historical-bugs/HistoricalBugList";

import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";

const IssuePanelPage = () => {
  const {
    issue,
    historicalBugs,
    issueLoading,
    bugsLoading,
    issueError,
    bugsError,
    refresh,
  } = useIssuePanelData();

  return (
    <main className="app-container">
      <header className="app-header">
        <div>
          <span className="app-brand">TESTTRAIL AI</span>
          <h1>Regression Intelligence</h1>
          <p>Evidence-backed regression insights for your Jira issues.</p>
        </div>

        <button className="refresh-button" onClick={refresh}>
          ↻ Refresh
        </button>
      </header>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">CURRENT ISSUE</span>
            <h2>Issue Context</h2>
          </div>
        </div>

        {issueLoading ? (
          <LoadingState message="Loading Jira issue..." />
        ) : issueError ? (
          <ErrorState message={issueError} onRetry={refresh} />
        ) : (
          <IssueSummary issue={issue} />
        )}
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">REGRESSION INTELLIGENCE</span>
            <h2>Historical Bugs</h2>
            <p>Previously reported bugs from this Jira project.</p>
          </div>

          {!bugsLoading && !bugsError && (
            <span className="result-count">{historicalBugs.length} found</span>
          )}
        </div>

        {bugsLoading ? (
          <LoadingState message="Searching historical bugs..." />
        ) : bugsError ? (
          <ErrorState message={bugsError} onRetry={refresh} />
        ) : (
          <HistoricalBugList bugs={historicalBugs} />
        )}
      </section>

      <footer className="app-footer">
        TestTrail AI · Evidence-backed regression intelligence
      </footer>
    </main>
  );
};

export default IssuePanelPage;
