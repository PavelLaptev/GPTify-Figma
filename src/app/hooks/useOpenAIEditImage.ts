import React from "react";
import { makeCreateImageRequest } from "../../utils";

export interface useOpenAIEditImageProps {
  showInConsole?: boolean;
  config?: {
    secret: string;
    prompt: string;
    image: string;
    mask: string;
    size: string;
  };
  setErrorMessage: (message: string) => void;
}

export const useOpenAIEditImage = (props: useOpenAIEditImageProps) => {
  React.useEffect(() => {
    window.onmessage = async (event) => {
      const msg = event.data.pluginMessage;

      if (msg.type === "get-imagenodes") {
        const imageObjects = msg.imageObjects;

        imageObjects.forEach(async (imageObject) => {
          const resultImageNode = await makeCreateImageRequest({
            secret: props.config.secret,
            size: props.config.size,
            prompt: props.config.prompt,
            setErrorMessage: props.setErrorMessage,
          });

          if (props.showInConsole) {
            console.log("resultImageNode", resultImageNode);
            console.log("config", props.config);
          }

          // convert base64 to ArrayBuffer
          const base64Data = resultImageNode.replace(
            /^data:image\/\w+;base64,/,
            ""
          );

          const uint8Array = new Uint8Array(
            atob(base64Data)
              .split("")
              .map((char) => char.charCodeAt(0))
          );

          parent.postMessage(
            {
              pluginMessage: {
                type: "set-imagenode",
                imageObject: {
                  id: imageObject.id,
                  uint8Array: uint8Array,
                },
              },
            },
            "*"
          );
        });
      }
    };
  }, [props.config, props.showInConsole]);
};
