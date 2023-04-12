import React from "react";
import { makeEditRequest } from "./../../utils";

export interface UseOpenAICompletionProps {
  deps: any[];
  apiKey: string;
  prompt: string;
}

export const useOpenAICompletion = (props: UseOpenAICompletionProps) => {
  React.useEffect(() => {
    window.onmessage = async (event) => {
      const msg = event.data.pluginMessage;

      if (msg.type === "get-textnodes") {
        const textObjects = msg.textObjects;

        textObjects.forEach(async (textObject) => {
          console.log("props.prompt", props.prompt);
          try {
            const resultTextNode = await makeEditRequest(
              props.apiKey,
              textObject.text,
              props.prompt
            );

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
  }, [props.deps]);
};
