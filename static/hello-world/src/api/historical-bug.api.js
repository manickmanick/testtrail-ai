import { invoke } from "@forge/bridge";

export const fetchHistoricalBugs = async () => {
  return invoke("searchHistoricalBugs");
};