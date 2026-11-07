import React, { useEffect, useState } from "react";
import { events, invoke } from "@forge/bridge";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // const handleFetchSuccess = (issueContext) => {
  //   setData(issueContext);
  // };

  const handleFetchSuccess = (response) => {
    if (!response.success) {
      setError(response.error?.message);
      setData(null);
      return;
    }

    setError(null);

    // console.log("Jira Description:", response.data.description);

    setData(response.data);
  };

  const handleFetchError = (error) => {
    console.error("Failed to fetch issue context:", error);
  };

  useEffect(() => {
    const fetchIssueContext = async () => invoke("fetchIssueContext");

    fetchIssueContext().then(handleFetchSuccess).catch(handleFetchError);

    const subscriptionPromise = events.on("JIRA_ISSUE_CHANGED", () => {
      fetchIssueContext().then(handleFetchSuccess).catch(handleFetchError);
    });

    return () => {
      subscriptionPromise.then((subscription) => subscription.unsubscribe());
    };
  }, []);

  if (!data) {
    return <div>Loading issue context...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>{data.issueKey}</h2>

      <h3>{data.summary}</h3>

      <p>{data.description}</p>

      <p>
        <strong>Status:</strong> {data.status}
      </p>

      <p>
        <strong>Issue Type:</strong> {data.issueType}
      </p>

      <h4>Labels</h4>
      {data.labels.map((label) => (
        <div key={label}>{label}</div>
      ))}

      <h4>Components</h4>
      {data.components.map((component) => (
        <div key={component}>{component}</div>
      ))}
    </div>
  );
}

export default App;
