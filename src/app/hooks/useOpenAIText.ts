import React from "react";
import { makeEditRequest } from "../../utils";

export interface useOpenAITextProps {
  showInConsole?: boolean;
  config?: {
    secret: string;
    instruction: string;
    model?: string;
    temperature?: number;
    stopSequences?: string[];
  };
  setErrorMessage: (message: string) => void;
}

export const useOpenAIText = (props: useOpenAITextProps) => {
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
                textObjectType: {
                  id: textObject.id,
                  text: resultTextNode,
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
