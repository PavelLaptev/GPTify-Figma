export const findAllTextNodes = (nodes: readonly SceneNode[]): TextNode[] => {
  const textNodes: TextNode[] = [];

  const findTextNodes = (nodes: readonly SceneNode[]) => {
    for (const node of nodes) {
      if (node.type === "TEXT") {
        textNodes.push(node as TextNode);
      } else if ("children" in node) {
        findTextNodes(node.children);
      }
    }
  };

  findTextNodes(nodes);
  return textNodes;
};
