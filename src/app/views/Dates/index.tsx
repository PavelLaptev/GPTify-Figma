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

export const Dates: React.FC<TextEditsViewProps> = (props) => {
  const [isBusy, setIsBusy] = React.useState(false);
  const [dateFormat, setDateFormat] = React.useState("DD/MM/YYYY");

  useOpenAIText({
    config: {
      secret: props.apiKey,
      instruction: prompt(dateFormat),
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
          <Button
            isBusy={isBusy}
            onClick={() => getTextnodes(setIsBusy)}
            label="Convert dates"
          />
        </Layout>
      </Layout>
      <ViewGithubSource link="https://github.com/PavelLaptev/GPTify-Figma/blob/main/src/app/views/Translate/prompt.ts" />
    </Layout>
  );
};
