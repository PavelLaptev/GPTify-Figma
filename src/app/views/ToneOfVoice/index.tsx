import React from "react";
import { useOpenAICompletion } from "../../hooks";
import { getTextnodes } from "../../../utils";
import { toneOptions } from "./toneOptions";
import { prompt } from "./prompt";
import {
  Select,
  Button,
  Layout,
  HeaderWrap,
  HeaderBack,
  ViewGithubSource,
} from "../../components";

// Add parent class for sub-components
export const ToneOfVoice: React.FC<TextEditsViewProps> = (props) => {
  const [toneOfVoice, setToneOfVoice] = React.useState("formal");

  useOpenAICompletion({
    config: {
      secret: props.apiKey,
      instruction: prompt(toneOfVoice),
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
            label="Tone of Voice"
          />
        </HeaderWrap>
        <p className="caption">Convert text into a different tone of voice.</p>
        <Layout gap="small">
          <Select
            id="language"
            options={toneOptions}
            value={toneOfVoice}
            onChange={(e) => setToneOfVoice(e.target.value)}
          />
          <Button onClick={getTextnodes} label="Convert selected" />
        </Layout>
      </Layout>
      <ViewGithubSource link="https://github.com/PavelLaptev/GPTify-Figma/blob/main/src/app/views/Translate/prompt.ts" />
    </Layout>
  );
};
