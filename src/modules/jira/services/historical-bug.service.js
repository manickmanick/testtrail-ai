import api, { route } from "@forge/api";

export const searchHistoricalBugs = async (projectKey) => {
  const jql = `project = "${projectKey}" AND issuetype = Bug ORDER BY created DESC`;

  const response = await api
    .asUser()
    .requestJira(route`/rest/api/3/search/jql`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jql,
        maxResults: 50,
        fields: [
          "summary",
          "description",
          "status",
          "issuetype",
          "labels",
          "created",
        ],
      }),
    });

  if (!response.ok) {
    throw new Error("Unable to search historical bugs in Jira");
  }

  const data = await response.json();

  return data.issues ?? [];
};
