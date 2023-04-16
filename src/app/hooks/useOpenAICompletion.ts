import React from "react";
import { makeEditRequest } from "./../../utils";

export interface UseOpenAICompletionProps {
  showInConsole?: boolean;
  config?: {
    secret: string;
    instruction: string;
    model?: string;
    temperature?: number;
    stopSequences?: string[];
  };
}

export const useOpenAICompletion = (props: UseOpenAICompletionProps) => {
  React.useEffect(() => {
    window.onmessage = async (event) => {
      const msg = event.data.pluginMessage;

      if (msg.type === "get-textnodes") {
        const textObjects = msg.textObjects;

        textObjects.forEach(async (textObject) => {
          try {
            const resultTextNode = await makeEditRequest({
              model: props.config.model,
              secret: props.config.secret,
              input: textObject.text,
              instruction: props.config.instruction,
              temperature: props.config.temperature,
              stopSequences: props.config.stopSequences,
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
          } catch (error) {
            console.log("Error generating prompts", error);
            return false;
          }
        });
      }
    };
  }, [props.config, props.showInConsole]);
};
