import React from "react";
import { getTextFromGptOutputTag } from "./../../utils";
const { Configuration, OpenAIApi } = require("openai");

export interface UseOpenAICompletionProps {
  deps: any[];
  apiKey: string;
  prompt: string;
}

export const useOpenAICompletion = (props: UseOpenAICompletionProps) => {
  React.useEffect(() => {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    window.onmessage = async (event) => {
      const msg = event.data.pluginMessage;

      if (msg.type === "get-textnodes") {
        const textObjects = msg.textObjects;

        textObjects.forEach(async (textObject) => {
          console.log("props.prompt", props.prompt);
          try {
            // const res = await fetch("https://api.openai.com/v1/completions", {
            //   method: "POST",
            //   headers: {
            //     "content-type": "application/json",
            //     authorization: `Bearer ${props.apiKey}`,
            //   },
            //   body: JSON.stringify({
            //     model: "text-davinci-edit-001",
            //     input: textObject.text,
            //     instruction: props.prompt,
            //     max_tokens: 150,
            //     temperature: 0,
            //     top_p: 1,
            //     frequency_penalty: 1,
            //     presence_penalty: 1,
            //   }),
            // });

            const res = await fetch("https://api.openai.com/v1/edits", {
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${props.apiKey}`,
              },
              body: JSON.stringify({
                model: "text-davinci-edit-001",
                input: textObject.text,
                instruction: props.prompt,
              }),
            });

            const data = await res.json();

            console.log("From OpenAI: ", data);
            const resultTextNode = getTextFromGptOutputTag(
              data.choices[0].text
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
