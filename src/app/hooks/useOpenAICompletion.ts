import React from "react";

export interface UseOpenAICompletionProps {
  deps: any[];
  apiKey: string;
  prompt: (nodeText: string) => string;
}

export const useOpenAICompletion = (props: UseOpenAICompletionProps) => {
  React.useEffect(() => {
    window.onmessage = async (event) => {
      const msg = event.data.pluginMessage;

      if (msg.type === "get-textnodes") {
        const textObjects = msg.textObjects;

        console.log("textObjects", textObjects);

        textObjects.forEach(async (textObject) => {
          try {
            const res = await fetch("https://api.openai.com/v1/completions", {
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${props.apiKey}`,
              },
              body: JSON.stringify({
                model: "text-davinci-003",
                prompt: props.prompt(textObject.text),
                max_tokens: 150,
                temperature: 0,
              }),
            });

            const data = await res.json();
            const resultTextNode = data.choices[0].text;

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
