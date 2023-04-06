import React from "react";
import { Configuration, OpenAIApi } from "openai";

// const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

// const configuration = new Configuration({
//   apiKey: apiKey,
// });
// const openai: OpenAIApi = new OpenAIApi(configuration);

interface Props {
  apiKey: string;
}

// Add parent class for sub-components
export const TranslateSection: React.FC<Props> = (props) => {
  const [apiKey, setApiKey] = React.useState(props.apiKey);

  // const sendRequest = () => {
  //   parent.postMessage({ pluginMessage: { type: "get-textnodes" } }, "*");
  // };

  // const handleTranslation = async (arr: textObject[]) => {
  //   const prompt = `Translate text into german: "hello to all good people!"`;

  //   const response = await openai.createCompletion({
  //     model: "text-davinci-003",
  //     prompt: prompt,
  //   });

  //   console.log(response.data.choices[0].text);
  // };

  // React.useEffect(() => {
  //   window.onmessage = (event) => {
  //     const msg = event.data.pluginMessage;

  //     if (msg.type === "get-textnodes") {
  //       const textObjects = msg.textObjects;

  //       handleTranslation(textObjects);
  //     }
  //   };
  // }, []);

  const createRequest = async () => {
    const configuration = new Configuration({
      apiKey: apiKey,
    });

    const openai: OpenAIApi = new OpenAIApi(configuration);

    const prompt = `Translate text into german: "hello to all good people!"`;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.9,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log(response.data.choices[0].text);
  };

  React.useEffect(() => {
    setApiKey(props.apiKey);
  }, [props.apiKey]);

  return (
    <section>
      <button onClick={createRequest}>Translate selected</button>
    </section>
  );
};
