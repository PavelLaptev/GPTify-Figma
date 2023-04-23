export const findAllImageNodes = (nodes: readonly SceneNode[]) => {
  const textNodes = [];

  const findImageNodes = (nodes: readonly SceneNode[]) => {
    for (const node of nodes) {
      if (
        node.type === "FRAME" ||
        node.type === "ELLIPSE" ||
        node.type === "RECTANGLE" ||
        node.type === "VECTOR"
      ) {
        const nodesWithImages = (node.fills as Array<any>).filter((fill) => {
          return fill.type === "IMAGE";
        });

        if (nodesWithImages.length > 0) {
          textNodes.push(node);
        }
      } else if ("children" in node) {
        findImageNodes(node.children);
      }
    }
  };

  findImageNodes(nodes);
  return textNodes;
};
