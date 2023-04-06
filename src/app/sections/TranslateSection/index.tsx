import React from "react";

interface Props {
  apiKey: string;
}

export const requestToTranslate = async (apiKey, textObjArr: textObject[]) => {
  const prompt = `Take this array: 
        ${JSON.stringify(textObjArr)}
        and translate key "text" into german. If a text already in german — skip it. Return only the array with the translated text.`;

  try {
    const res = await fetch(`https://api.openai.com/v1/completions`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 70,
        temperature: 0.9,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error generating prompts", error);
    return false;
  }
};

// Add parent class for sub-components
export const TranslateSection: React.FC<Props> = (props) => {
  const [apiKey, setApiKey] = React.useState(props.apiKey);

  const handleTranslation = async () => {
    parent.postMessage({ pluginMessage: { type: "get-textnodes" } }, "*");
    console.log("apiKey", apiKey);
  };

  React.useEffect(() => {
    window.onmessage = async (event) => {
      const msg = event.data.pluginMessage;

      if (msg.type === "get-textnodes") {
        const textObjects = msg.textObjects;

        console.log("textObjects", textObjects);

        requestToTranslate(apiKey, textObjects)
          .then((response) => {
            console.log("response", response.choices[0].text);
            const translatedTextNodes = JSON.parse(response.choices[0].text);

            console.log("translatedTextNodes", translatedTextNodes);

            parent.postMessage(
              {
                pluginMessage: {
                  type: "set-textnodes",
                  textObjects: translatedTextNodes,
                },
              },
              "*"
            );
          })
          .catch((error) => console.error(error));
      }
    };
  }, []);

  React.useEffect(() => {
    setApiKey(props.apiKey);
  }, [props.apiKey]);

  return (
    <section>
      <button onClick={handleTranslation}>Translate selected</button>
    </section>
  );
};
