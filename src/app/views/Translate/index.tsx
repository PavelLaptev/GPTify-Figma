import React from "react";
import { useOpenAITextComplete } from "./../../hooks";
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
  const [isBusy, setIsBusy] = React.useState(false);
  const [language, setLanguage] = React.useState("german");

  useOpenAITextComplete({
    config: {
      secret: props.apiKey,
      prompt: prompt(language),
      model: "text-davinci-003",
    },
    setErrorMessage: props.setErrorMessage,
    setIsBusy,
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
          <Button
            isBusy={isBusy}
            onClick={() => getTextnodes(setIsBusy)}
            label="Translate selected"
          />
        </Layout>
      </Layout>
      <ViewGithubSource link="https://github.com/PavelLaptev/GPTify-Figma/blob/main/src/app/views/Translate/prompt.ts" />
    </Layout>
  );
};
