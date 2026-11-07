import { searchHistoricalBugs } from "../modules/jira/services/historical-bug.service.js";

import { successResponse } from "../shared/responses/api.response.js";
import { handleError } from "../shared/errors/error.handler.js";

export const registerHistoricalBugResolvers = (resolver) => {
  resolver.define("searchHistoricalBugs", async (req) => {
    try {
      const issueKey = req.context.extension.issue.key;

      if (!issueKey) {
        return handleError(
          new Error("Jira issue key is missing"),
          "INVALID_ISSUE_KEY",
          "Unable to identify the current Jira issue",
        );
      }

      const projectKey = issueKey.split("-")[0];

      const bugs = await searchHistoricalBugs(projectKey);

      return successResponse(bugs);
    } catch (error) {
      return handleError(
        error,
        "HISTORICAL_BUG_SEARCH_FAILED",
        "Unable to retrieve historical bugs",
      );
    }
  });
};
