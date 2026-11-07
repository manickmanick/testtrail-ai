// import Resolver from "@forge/resolver";
import api, { route } from "@forge/api";

import { successResponse } from "../shared/responses/api.response.js";
import { handleError } from "../shared/errors/error.handler.js";
import { AppError } from "../shared/errors/app.error.js";
import { extractTextFromADF } from "../utils/adfParser.js";

// const resolver = new Resolver();

export const registerJiraResolvers = (resolver) => {
  resolver.define("fetchIssueContext", async (req) => {
    try {
      const key = req.context.extension.issue.key;

      if (!key) {
        throw new AppError("INVALID_ISSUE_KEY", "Jira issue key is missing");
      }

      const res = await api
        .asUser()
        .requestJira(
          route`/rest/api/3/issue/${key}?fields=summary,description,status,issuetype,labels,components`,
        );

      if (!res.ok) {
        throw new AppError("JIRA_API_ERROR", "Unable to fetch Jira issue");
      }

      const data = await res.json();

      const issueContext = {
        issueKey: key,
        summary: data?.fields?.summary || "",
        description: extractTextFromADF(data?.fields?.description),
        status: data?.fields?.status?.name || "",
        issueType: data?.fields?.issuetype?.name || "",
        labels: data?.fields?.labels ?? [],
        components: (data?.fields?.components ?? []).map(
          (component) => component.name,
        ),
      };

      return successResponse(issueContext);
    } catch (error) {
      if (error instanceof AppError) {
        return handleError(error, error.code, error.message);
      }

      return handleError(
        error,
        "INTERNAL_SERVER_ERROR",
        "Something went wrong while fetching Jira issue",
      );
    }
  });
};

// export default resolver;
