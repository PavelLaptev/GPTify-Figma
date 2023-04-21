import React from "react";
import { useOpenAIText } from "./../../hooks";
import { getTextnodes } from "../../../utils";
import { prompt } from "./prompt";
import {
  Input,
  Button,
  Layout,
  HeaderWrap,
  HeaderBack,
  ViewGithubSource,
} from "../../components";

// Add parent class for sub-components
export const Translate: React.FC<TextEditsViewProps> = (props) => {
  const [language, setLanguage] = React.useState("german");

  useOpenAIText({
    config: {
      secret: props.apiKey,
      instruction: prompt(language),
    },
    setErrorMessage: props.setErrorMessage,
  });

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
            id="language"
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <Button onClick={getTextnodes} label="Translate selected" />
        </Layout>
      </Layout>
      <ViewGithubSource link="https://github.com/PavelLaptev/GPTify-Figma/blob/main/src/app/views/Translate/prompt.ts" />
    </Layout>
  );
};
