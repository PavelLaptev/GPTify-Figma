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

interface Props {
  apiKey: string;
  setView: (view: viewsType) => void;
}

export const Dates: React.FC<Props> = (props) => {
  const [dateFormat, setDateFormat] = React.useState("DD/MM/YYYY");

  useOpenAICompletion({
    apiKey: props.apiKey,
    prompt: prompt(dateFormat),
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
            label="Dates"
          />
        </HeaderWrap>
        <p className="caption">
          Using this prompt, you can convert any dates to your preferred format.
        </p>
        <Layout gap="small">
          <Input
            id="date-format"
            type="text"
            value={dateFormat}
            onChange={(e) => setDateFormat(e.target.value)}
          />
          <Button onClick={getTextnodes} label="Convert dates" />
        </Layout>
      </Layout>
      <ViewGithubSource link="https://github.com/PavelLaptev/GPTify-Figma/blob/main/src/app/views/Translate/prompt.ts" />
    </Layout>
  );
};
