import React from "react";
import { requestToOpenIA, getTextnodes } from "../../../utils";
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
export const Dates: React.FC<Props> = (props) => {
  const [language, setLanguage] = React.useState("german");

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
            label="Dates"
          />
        </HeaderWrap>
        <p className="caption">
          Using this prompt, you can convert any dates to your preferred format.
        </p>
        <Layout gap="small">
          <Input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <Button onClick={getTextnodes} label="Translate selected" />
        </Layout>
      </Layout>
      <ViewGithubSource link="https://github.com/PavelLaptev/GPTify-Figma/blob/main/src/app/views/Dates/prompt.ts" />
    </Layout>
  );
};
