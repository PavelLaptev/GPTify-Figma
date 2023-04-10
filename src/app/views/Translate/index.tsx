import React from "react";
import { requestToOpenIA } from "../../../utils";
import { prompt } from "./prompt";
import {
  Input,
  Button,
  Layout,
  HeaderWrap,
  HeaderBack,
  ViewGithubSource,
} from "../../components";

interface Props {
  apiKey: string;
  setView: (view: viewsType) => void;
}

// Add parent class for sub-components
export const Translate: React.FC<Props> = (props) => {
  const [language, setLanguage] = React.useState("german");

  const handleTranslation = async () => {
    parent.postMessage({ pluginMessage: { type: "get-textnodes" } }, "*");
    console.log("apiKey", props.apiKey);
  };

  React.useEffect(() => {
    window.onmessage = async (event) => {
      const msg = event.data.pluginMessage;

      if (msg.type === "get-textnodes") {
        const textObjects = msg.textObjects;

        console.log("textObjects", textObjects);

        textObjects.forEach(async (textObject) => {
          await requestToOpenIA(
            props.apiKey,
            prompt(language, textObject.text),
            textObject.id
          );
          // try {
          //   const res = await fetch("https://api.openai.com/v1/completions", {
          //     method: "POST",
          //     headers: {
          //       "content-type": "application/json",
          //       authorization: `Bearer ${props.apiKey}`,
          //     },
          //     body: JSON.stringify({
          //       model: "text-davinci-003",
          //       prompt: prompt(language, textObject.text),
          //       max_tokens: 150,
          //       temperature: 0,
          //     }),
          //   });

          //   const data = await res.json();
          //   const translatedTextNode = data.choices[0].text;

          //   console.log("translatedTextNode", translatedTextNode);

          //   parent.postMessage(
          //     {
          //       pluginMessage: {
          //         type: "set-textnode",
          //         textObjectType: {
          //           id: textObject.id,
          //           text: translatedTextNode,
          //         },
          //       },
          //     },
          //     "*"
          //   );
          // } catch (error) {
          //   console.log("Error generating prompts", error);
          //   return false;
          // }
        });
      }
    };
  }, [language]);

  return (
    <Layout gap="null">
      <Layout gap="medium">
        <HeaderWrap setView={props.setView}>
          <HeaderBack
            onClick={() => {
              props.setView("text");
            }}
            label="Translate"
          />
        </HeaderWrap>
        <p className="caption">
          Select text nodes or layers/frames/groups and translate them into
          preferred language.
        </p>
        <Layout gap="small">
          <Input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <Button onClick={handleTranslation} label="Translate selected" />
        </Layout>
      </Layout>
      <ViewGithubSource link="https://github.com/PavelLaptev/GPTify-Figma/blob/main/src/app/views/Translate/prompt.ts" />
    </Layout>
  );
};
