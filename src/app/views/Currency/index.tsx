import React from "react";
import { useOpenAITextComplete } from "../../hooks";
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

export const Currency: React.FC<TextEditsViewProps> = (props) => {
  const [isBusy, setIsBusy] = React.useState(false);
  const [convertFormat, setConvertFormat] = React.useState("USD");

  useOpenAITextComplete({
    config: {
      secret: props.apiKey,
      prompt: prompt(convertFormat),
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
            label="Currency"
          />
        </HeaderWrap>
        <p className="caption">The prompt helps you convert currency.</p>

        <Layout gap="small">
          <Input
            id="currency-format"
            type="text"
            value={convertFormat}
            onChange={(e) => setConvertFormat(e.target.value)}
          />
          <Button
            isBusy={isBusy}
            onClick={() => getTextnodes(setIsBusy)}
            label="Convert to currency"
          />
        </Layout>

        <p className="caption">
          ⚠️ Please note that the exchange rates provided may be outdated, as
          the information used to train this model only goes up until September
          2021.
        </p>
      </Layout>
      <ViewGithubSource link="https://github.com/PavelLaptev/GPTify-Figma/blob/main/src/app/views/Currency/prompt.ts" />
    </Layout>
  );
};
