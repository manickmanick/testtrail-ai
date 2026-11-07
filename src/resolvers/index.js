import { registerJiraResolvers } from "./jira.resolver.js";

export const registerResolvers = (resolver) => {
  registerJiraResolvers(resolver);
};