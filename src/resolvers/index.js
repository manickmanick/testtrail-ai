import { registerJiraResolvers } from "./jira.resolver.js";
import { registerHistoricalBugResolvers } from "./historical-bug.resolver.js";


export const registerResolvers = (resolver) => {
  registerJiraResolvers(resolver);
   registerHistoricalBugResolvers(resolver);
};