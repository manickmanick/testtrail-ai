import { useCallback, useEffect, useState } from "react";
import { events } from "@forge/bridge";

import { fetchIssueContext } from "../api/issue.api";
import { fetchHistoricalBugs } from "../api/historical-bug.api";

const useIssuePanelData = () => {
  const [issue, setIssue] = useState(null);
  const [historicalBugs, setHistoricalBugs] = useState([]);

  const [issueLoading, setIssueLoading] = useState(true);
  const [bugsLoading, setBugsLoading] = useState(true);

  const [issueError, setIssueError] = useState(null);
  const [bugsError, setBugsError] = useState(null);

  const fetchData = useCallback(async () => {
    setIssueLoading(true);
    setBugsLoading(true);

    setIssueError(null);
    setBugsError(null);

    const issuePromise = fetchIssueContext()
      .then((response) => {
        if (!response?.success) {
          throw new Error(
            response?.error?.message || "Unable to load Jira issue",
          );
        }

        setIssue(response.data);
      })
      .catch((error) => {
        console.error("Issue fetch failed:", error);
        setIssue(null);
        setIssueError(error.message);
      })
      .finally(() => {
        setIssueLoading(false);
      });

    const bugsPromise = fetchHistoricalBugs()
      .then((response) => {
        if (!response?.success) {
          throw new Error(
            response?.error?.message || "Unable to load historical bugs",
          );
        }

        setHistoricalBugs(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Historical bug fetch failed:", error);
        setHistoricalBugs([]);
        setBugsError(error.message);
      })
      .finally(() => {
        setBugsLoading(false);
      });

    await Promise.all([issuePromise, bugsPromise]);
  }, []);

  useEffect(() => {
    let isMounted = true;
    let subscription;

    const loadData = async () => {
      if (isMounted) {
        await fetchData();
      }
    };

    loadData();

    events.on("JIRA_ISSUE_CHANGED", loadData).then((result) => {
      if (isMounted) {
        subscription = result;
      } else {
        result.unsubscribe();
      }
    });

    return () => {
      isMounted = false;

      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [fetchData]);

  return {
    issue,
    historicalBugs,
    issueLoading,
    bugsLoading,
    issueError,
    bugsError,
    refresh: fetchData,
  };
};

export default useIssuePanelData;
