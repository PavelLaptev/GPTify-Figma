import React from "react";
import { OpenAIApi } from "openai";

// const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

// const configuration = new Configuration({
//   apiKey: apiKey,
// });
// const openai: OpenAIApi = new OpenAIApi(configuration);

interface Props {
  api: OpenAIApi;
}

// Add parent class for sub-components
export const TranslateSection: React.FC<Props> = (props) => {
  const [api, setApi] = React.useState(props.api);

  // const sendRequest = () => {
  //   parent.postMessage({ pluginMessage: { type: "get-textnodes" } }, "*");
  // };

  const handleTranslation = async () => {
    // const promptTwo = `Translate text into german: "hello to all good people!"`;
    // const propmt;

    parent.postMessage({ pluginMessage: { type: "get-textnodes" } }, "*");

    // const response = await api.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: promptTwo,
    //   max_tokens: 100,
    //   temperature: 0.9,
    //   top_p: 1,
    //   frequency_penalty: 0,
    //   presence_penalty: 0,
    // });

    // console.log(response.data.choices[0].text);
  };

  React.useEffect(() => {
    window.onmessage = async (event) => {
      const msg = event.data.pluginMessage;

      if (msg.type === "get-textnodes") {
        const textObjects = msg.textObjects;

        console.log("textObjects", textObjects);

        const prompt = `Take this array: 
        ${JSON.stringify(textObjects)}
        and translate key "text" into german. If a text already in german — skip it. Return only the array with the translated text.`;

        const response = await api.createCompletion({
          model: "text-davinci-003",
          prompt: prompt,
          max_tokens: 300,
          temperature: 0.9,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });

        console.log("string response", response.data.choices[0].text);

        const JSONResponse = JSON.parse(
          response.data.choices[0].text
        ) as textObject[];

        // send back to figma
        parent.postMessage(
          {
            pluginMessage: { type: "set-textnodes", textObjects: JSONResponse },
          },
          "*"
        );
      }
    };
  }, []);

  React.useEffect(() => {
    setApi(props.api);
  }, [props.api]);

  return (
    <section>
      <button onClick={handleTranslation}>Translate selected</button>
    </section>
  );
};
