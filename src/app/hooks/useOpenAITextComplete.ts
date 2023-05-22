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
          console.log("textObject", textObject);
          const requestConfig = {
            model: props.config.model,
            prompt: generatePromptString(textObject.text, props.config.prompt),
            max_tokens: props.config.maximumTokens,
            temperature: props.config.temperature,
            top_p: props.config.topP,
            n: props.config.n,
            frequency_penalty: props.config.frequencyPenalty,
            presence_penalty: props.config.presencePenalty,
            ...((props.config.stopSequences.length > 0 && {
              stop: props.config.stopSequences,
            }) as {}),
          };

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
    };
  }, [props.config, props.showInConsole]);
};
