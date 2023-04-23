export const findAllSuiteblelForImageNodes = (nodes: readonly SceneNode[]) => {
  const textNodes = [];

  const findImageNodes = (nodes: readonly SceneNode[]) => {
    for (const node of nodes) {
      if (
        node.type === "FRAME" ||
        node.type === "ELLIPSE" ||
        node.type === "RECTANGLE" ||
        node.type === "VECTOR"
      ) {
        textNodes.push(node);
      } else if ("children" in node) {
        findImageNodes(node.children);
      }
    }
  };

  findImageNodes(nodes);
  return textNodes;
};
