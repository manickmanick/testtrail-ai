import { errorResponse } from "../responses/api.response.js";

export const handleError = (error, code, message) => {
  console.error("Application Error:", error);

  return errorResponse(code, message);
};