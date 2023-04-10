import { handleResize } from "./handleResize";

import { removeLeadingNewLines } from "./../utils";

// clear console on reload
console.clear();

figma.skipInvisibleInstanceChildren = true;

// default plugin size
const pluginFrameSize = {
  width: 360,
  height: 370,
};

// show plugin UI
figma.showUI(__html__, pluginFrameSize);

const findAllTextNodes = (nodes: readonly SceneNode[]): TextNode[] => {
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

// listen for messages from the UI
figma.ui.onmessage = async (msg) => {
  handleResize(msg);

  const selection = figma.currentPage.selection;
  const isSomethingSelected = selection.length > 0;

  if (msg.type === "get-textnodes") {
    if (isSomethingSelected) {
      const textNodes = findAllTextNodes(selection);

      const textObjects = textNodes.map((node) => {
        return {
          id: node.id,
          text: node.characters,
          type: node.type,
        };
      }) as textObjectType[];

      figma.ui.postMessage({
        type: "get-textnodes",
        textObjects,
      });
    } else {
      figma.notify("Please select at least one node");
    }
  }

  if (msg.type === "set-textnode") {
    const textObject = msg.textObjectType as textObjectType;

    const node = figma.getNodeById(textObject.id) as TextNode;

    // replace text
    await figma.loadFontAsync(node.fontName as FontName);
    node.characters = removeLeadingNewLines(textObject.text);

    // console.log(textObjectTypes);

    // textObjectTypes.forEach(async (textObjectType) => {
    //   const node = figma.getNodeById(textObjectType.id) as TextNode;

    //   // replace text
    //   await figma.loadFontAsync(node.fontName as FontName);
    //   node.characters = textObjectType.text;
    // });

    figma.notify("Text updated");
  }
};

figma.currentPage.setRelaunchData({ open: "" });
