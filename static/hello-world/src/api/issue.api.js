import { invoke } from "@forge/bridge";

export const fetchIssueContext = async () => {
  return invoke("fetchIssueContext");
};