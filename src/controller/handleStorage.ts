export const handleStorage = async (msg) => {
  if (msg.type === "get-api-key") {
    try {
      const apiKey = await figma.clientStorage.getAsync("gptify-api-key");
      // console.log("get-api-key", apiKey);
      figma.ui.postMessage({
        type: "get-api-key",
        apiKey,
      });
    } catch (error) {
      console.warn(error);
    }
  }

  if (msg.type === "set-api-key") {
    // console.log("set-api-key", msg);
    const apiKey = msg.apiKey;
    figma.clientStorage.setAsync("gptify-api-key", apiKey);
  }

  if (msg.type === "clear-api-key") {
    console.log("clear-api-key");
    figma.clientStorage.setAsync("gptify-api-key", undefined);
  }
};

// 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
