import React from "react";
import { useOpenAICompletion } from "../../hooks";
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

interface Props {
  apiKey: string;
  setView: (view: viewsType) => void;
}

export const Currency: React.FC<Props> = (props) => {
  const [dateFormat, setDateFormat] = React.useState("DD/MM/YYYY");

  useOpenAICompletion({
    apiKey: props.apiKey,
    prompt: (nodeText: string) => prompt(dateFormat, nodeText),
    deps: [dateFormat],
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
          This prompt will find any currencies in your text and convert them to
          another currency.
        </p>
        <p className="caption">
          ⚠️ Please note that the exchange rates provided may be outdated, as
          the information used to train this model only goes up until September
          2021.
        </p>
        <Layout gap="small">
          <Input
            type="text"
            value={dateFormat}
            onChange={(e) => setDateFormat(e.target.value)}
          />
          <Button onClick={getTextnodes} label="Convert currency" />
        </Layout>
      </Layout>
      <ViewGithubSource link="https://github.com/PavelLaptev/GPTify-Figma/blob/main/src/app/views/Currency/prompt.ts" />
    </Layout>
  );
};
