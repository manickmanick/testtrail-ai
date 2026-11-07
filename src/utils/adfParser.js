export const extractTextFromADF = (node) => {
  if (!node) {
    return "";
  }

  if (node.type === "text") {
    return node.text;
  }

  if (!Array.isArray(node.content)) {
    return "";
  }

  return node.content
    .map(extractTextFromADF)
    .join("");
};