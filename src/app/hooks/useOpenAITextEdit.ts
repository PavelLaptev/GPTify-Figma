import React from "react";
import { makeEditRequest } from "../../utils";

export interface useOpenAITextEditProps {
  showInConsole?: boolean;
  config?: {
    secret: string;
    instruction: string;
    model?: string;
    temperature?: number;
    stopSequences?: string[];
  };
  setErrorMessage: (message: string) => void;
  setIsBusy: (isBusy: boolean) => void;
}

export const useOpenAITextEdit = (props: useOpenAITextEditProps) => {
  React.useEffect(() => {
    window.onmessage = async (event) => {
      const msg = event.data.pluginMessage;

      if (msg.type === "get-textnodes") {
        const textObjects = msg.textObjects;

        textObjects.forEach(async (textObject) => {
          const resultTextNode = await makeEditRequest({
            model: props.config.model,
            secret: props.config.secret,
            input: textObject.text,
            instruction: props.config.instruction,
            temperature: props.config.temperature,
            stopSequences: props.config.stopSequences,
            setErrorMessage: props.setErrorMessage,
          });

          if (props.showInConsole) {
            console.log("resultTextNode", resultTextNode);
            console.log("config", props.config);
          }

          parent.postMessage(
            {
              pluginMessage: {
                type: "set-textnode",
                textObject: {
                  id: textObject.id,
                  text: resultTextNode,
                },
              },
            },
            "*"
          );

          // if last textObject, set isBusy to false
          if (textObject.id === textObjects[textObjects.length - 1].id) {
            props.setIsBusy(false);
          }
        });
      }

      if (msg.type === "reset-busy-status") {
        props.setIsBusy(false);
      }
    };
  }, [props.config, props.showInConsole]);
};
