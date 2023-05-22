import React from "react";
import { useOpenAITextEdit } from "../../hooks";
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

  useOpenAITextEdit({
    config: {
      secret: props.apiKey,
      instruction: prompt(convertFormat),
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
        <p className="caption">
          This prompt will find any currencies in your text and convert them
          into your preferred currency and format.
        </p>

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
