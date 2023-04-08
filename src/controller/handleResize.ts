import { frameSize } from "./config";

export const handleResize = (msg) => {
  if (msg.type === "resize") {
    console.log("resize on plugin");
    figma.ui.resize(frameSize.width, msg.height);
  }
};
