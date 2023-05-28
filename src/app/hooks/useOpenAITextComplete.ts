import React from "react";
import { generatePromptString } from "../../utils";

export interface useOpenAITextEditProps {
  showInConsole?: boolean;
  config?: {
    secret: string;
    prompt: string;
    model?: string;
    temperature?: number;
    maximumTokens?: number;
    topP?: number;
    n?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
    stopSequences?: string[];
  };
  setErrorMessage: (message: string) => void;
  setIsBusy: (isBusy: boolean) => void;
}

export const useOpenAITextComplete = (props: useOpenAITextEditProps) => {
  React.useEffect(() => {
    window.onmessage = async (event) => {
      const msg = event.data.pluginMessage;

      if (msg.type === "get-textnodes") {
        const textObjects = msg.textObjects;

        props.setIsBusy(true);

        textObjects.forEach(async (textObject) => {
          const requestConfig = {
            model: props.config.model,
            prompt: generatePromptString(textObject.text, props.config.prompt),
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          };

          // console.log("Request config:", requestConfig);

          try {
            const res = await fetch("https://api.openai.com/v1/completions", {
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${props.config.secret}`,
              },
              body: JSON.stringify(requestConfig),
            });

            const data = await res.json();

            if (props.showInConsole) {
              console.log("Request config:", requestConfig);
              console.log("Response data:", data);
            }

            const selectedTextVariant = data.choices[0].text;

            parent.postMessage(
              {
                pluginMessage: {
                  type: "set-textnode",
                  textObject: {
                    id: textObject.id,
                    text: selectedTextVariant,
                  },
                },
              },
              "*"
            );

            // iif last text object, set busy to false
            if (textObjects.indexOf(textObject) === textObjects.length - 1) {
              props.setIsBusy(false);
            }
          } catch (error) {
            console.log("Error generating prompts", error);
            return false;
          }
        });
      }

      if (msg.type === "reset-busy-status") {
        console.log("Resetting busy status");
        props.setIsBusy(false);
      }
    };
  }, [props.config, props.showInConsole]);
};
