// import Resolver from "@forge/resolver";
// import api, { route } from "@forge/api";
// import { extractTextFromADF } from "./utils/adfParser.js";
// import { successResponse } from "./shared/responses/api.response.js";
// import { handleError } from "./shared/errors/error.handler.js";
// import { AppError } from "./shared/errors/app.error.js";
// import { extractTextFromADF } from "./utils/adfParser.js";

// const resolver = new Resolver();

// resolver.define("fetchIssueContext", async (req) => {
//   try {
//     const key = req.context.extension.issue.key;

//     if (!key) {
//       throw new AppError(
//         "INVALID_ISSUE_KEY",
//         "Jira issue key is missing"
//       );
//     }

//     const res = await api.asUser().requestJira(
//       route`/rest/api/3/issue/${key}?fields=summary,description,status,issuetype,labels,components`
//     );

//     if (!res.ok) {
//       throw new AppError(
//         "JIRA_API_ERROR",
//         "Unable to fetch Jira issue"
//       );
//     }

//     const data = await res.json();

//     const issueContext = {
//       issueKey: key,
//       summary: data?.fields?.summary || "",
//       description: extractTextFromADF(data?.fields?.description),
//       status: data?.fields?.status?.name || "",
//       issueType: data?.fields?.issuetype?.name || "",
//       labels: data?.fields?.labels ?? [],
//       components: (data?.fields?.components ?? []).map(
//         (component) => component.name
//       ),
//     };

//     return successResponse(issueContext);
//   } catch (error) {
//     if (error instanceof AppError) {
//       return handleError(error, error.code, error.message);
//     }

//     return handleError(
//       error,
//       "INTERNAL_SERVER_ERROR",
//       "Something went wrong while fetching Jira issue"
//     );
//   }
// });

// // resolver.define("fetchIssueContext", async (req) => {
// //   const key = req.context.extension.issue.key;

// //   const res = await api
// //     .asUser()
// //     .requestJira(
// //       route`/rest/api/3/issue/${key}?fields=summary,description,status,issuetype,labels,components`,
// //     );

// //   if (!res.ok) {
// //     throw new Error(`Jira API failed: ${res.status}`);
// //   }

// //   const data = await res.json();
// //   const descriptionText = extractTextFromADF(data?.fields?.description);

// //   const issueContext = {
// //     issueKey: key || "",
// //     summary: data?.fields?.summary || "",
// //     description: descriptionText || "",
// //     status: data?.fields?.status?.name || "",
// //     issueType: data?.fields?.issuetype?.name || "",
// //     labels: data?.fields?.labels ?? [],
// //     components: (data?.fields?.components ?? []).map(
// //       (component) => component.name,
// //     ),
// //   };

// //   return issueContext;
// //   //

// //   // const label = data.fields.labels;
// //   // if (label == undefined) {
// //   //   console.warn(`${key}: Failed to find labels`);
// //   //   return [];
// //   // }

// //   // return label;
// // });

// export const handler = resolver.getDefinitions();

import Resolver from "@forge/resolver";
import { registerResolvers } from "./resolvers/index.js";

const resolver = new Resolver();

registerResolvers(resolver);

export const handler = resolver.getDefinitions();
