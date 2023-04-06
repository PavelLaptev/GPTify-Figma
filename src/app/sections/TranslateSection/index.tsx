import React from "react";
import { Configuration, OpenAIApi } from "openai";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const configuration = new Configuration({
  apiKey: apiKey,
});
const openai: OpenAIApi = new OpenAIApi(configuration);

// Add parent class for sub-components
export const TranslateSection: React.FC = () => {
  const sendRequest = () => {
    parent.postMessage({ pluginMessage: { type: "get-textnodes" } }, "*");
  };

  const handleTranslation = async (arr: textObject[]) => {
    const prompt = `Translate text in this array for keys "text" into german ${JSON.stringify(
      arr
    )}`;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
    });

    console.log(response.data.choices[0].text);
  };

  React.useEffect(() => {
    window.onmessage = (event) => {
      const msg = event.data.pluginMessage;

      if (msg.type === "get-textnodes") {
        const textObjects = msg.textObjects;

        handleTranslation(textObjects);
      }
    };
  }, []);

  return (
    <section>
      <button onClick={sendRequest}>Translate selected</button>
    </section>
  );
};
