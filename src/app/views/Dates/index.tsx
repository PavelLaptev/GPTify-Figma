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

export const Dates: React.FC = () => {
  const { setView } = useViewStore();
  const { apiKey } = useApiKeysStore();

  const [dateFormat, setDateFormat] = React.useState("DD/MM/YYYY");

  useOpenAICompletion({
    config: {
      secret: apiKey,
      instruction: prompt(dateFormat),
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
