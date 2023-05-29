import React from "react";
import { useOpenAITextComplete } from "../../hooks";
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
  const [isBusy, setIsBusy] = React.useState(false);
  const [toneOfVoice, setToneOfVoice] = React.useState(toneOptions[0].value);

  useOpenAITextComplete({
    config: {
      secret: props.apiKey,
      prompt: prompt(toneOfVoice),
      model: "text-davinci-003",
    },
    setErrorMessage: props.setErrorMessage,
    setIsBusy,
  });

  React.useEffect(() => {
    console.log(prompt(toneOfVoice));
  }, [toneOfVoice]);

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
            onChange={(e) => setToneOfVoice(e.target.value as toneOfVoiceType)}
          />
          <Button
            isBusy={isBusy}
            onClick={() => getTextnodes(setIsBusy)}
            label="Convert selected"
          />
        </Layout>
      </Layout>
      <ViewGithubSource link="https://github.com/PavelLaptev/GPTify-Figma/blob/main/src/app/views/ToneOfVoice/prompt.ts" />
    </Layout>
  );
};
