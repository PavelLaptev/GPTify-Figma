import { frameSize } from "./config";
import { handleResize } from "./handleResize";
import { handleStorage } from "./handleStorage";

import {
  removeLeadingNewLines,
  findAllTextNodes,
  findAllImagesNodes,
} from "./../utils";

// clear console on reload
console.clear();

// show plugin UI
figma.showUI(__html__, frameSize);

figma.skipInvisibleInstanceChildren = true;

// clear stoorage
// figma.clientStorage.setAsync("gptify-api-key", undefined);

// listen for messages from the UI
figma.ui.onmessage = async (msg) => {
  handleResize(msg);
  handleStorage(msg);

  const selection = figma.currentPage.selection;
  const isSomethingSelected = selection.length > 0;

  //////////////////////////////////
  /////////// TEXT NODES ///////////
  //////////////////////////////////

  // post all text nodes to the UI
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
    const textObject = msg.textObject as textObjectType;

    console.log("textObject", textObject);

    const node = figma.getNodeById(textObject.id) as TextNode;

    // replace text
    await figma.loadFontAsync(node.fontName as FontName);
    node.characters = removeLeadingNewLines(textObject.text);

    figma.notify("Text updated");
  }

  //////////////////////////////////
  ////////// IMAGES NODES //////////
  //////////////////////////////////

  if (msg.type === "get-imagenodes") {
    if (isSomethingSelected) {
      const imageNodes = findAllImagesNodes(selection);

      const imageObjects = imageNodes.map((node) => {
        return {
          id: node.id,
          type: node.type,
        };
      }) as imageObjectType[];

      figma.ui.postMessage({
        type: "get-imagenodes",
        imageObjects,
      });
    } else {
      figma.notify("Please select at least one node");
    }
  }

  if (msg.type === "set-imagenode") {
    const imageObject = msg.imageObject as imageObjectType;

    const uint8Array = imageObject.uint8Array;
    const node = figma.getNodeById(imageObject.id);

    // convert ArrayBuffer to image
    const imageHash = figma.createImage(uint8Array).hash;

    // replace image
    const newFill = {
      type: "IMAGE",
      opacity: 1,
      blendMode: "NORMAL",
      scaleMode: "FILL",
      imageHash: imageHash,
    };
    node["fills"] = [newFill];

    console.log("imageHash", imageHash);
  }
};

figma.currentPage.setRelaunchData({ open: "" });
