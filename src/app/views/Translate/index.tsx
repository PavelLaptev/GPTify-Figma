import React from "react";
import { useOpenAICompletion } from "./../../hooks";
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
import { useViewStore, useApiKeysStore } from "./../../store";

// Add parent class for sub-components
export const Translate: React.FC = () => {
  const { setView } = useViewStore();
  const { apiKey } = useApiKeysStore();
  const [language, setLanguage] = React.useState("german");

  console.log("apiKey", apiKey);

  useOpenAICompletion({
    config: {
      secret: apiKey,
      instruction: prompt(language),
    },
  });

  return (
    <Layout gap="null">
      <Layout gap="medium">
        <HeaderWrap setView={setView}>
          <HeaderBack
            onClick={() => {
              setView("text");
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
