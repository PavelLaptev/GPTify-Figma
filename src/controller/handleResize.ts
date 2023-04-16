import { frameSize } from "./config";

export const handleResize = (msg) => {
  const zoomRatio = figma.viewport.zoom;
  const maximumPluginHeight =
    Math.round(figma.viewport.bounds.height * zoomRatio) - 140;

  if (msg.type === "resize") {
    if (msg.height > maximumPluginHeight) {
      figma.ui.resize(frameSize.width, maximumPluginHeight);
    } else {
      figma.ui.resize(frameSize.width, Math.round(msg.height));
    }
  }
};
