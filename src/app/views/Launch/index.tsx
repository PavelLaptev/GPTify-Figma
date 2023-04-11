import React from "react";
import { Input, Button, Layout } from "../../components";
import styles from "./styles.module.scss";

import coverImg from "../../assets/cover.webp";

const apiENVKey = process.env.REACT_APP_OPENAI_API_KEY;

interface Props {
  setApiKey: (apiKey: string) => void;
  setView: (view: viewsType) => void;
}

export const Launch: React.FC<Props> = (props) => {
  const [inputValue, setInputValue] = React.useState(apiENVKey);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleApply = () => {
    if (inputValue) {
      props.setView("text");
      props.setApiKey(inputValue);
    }
  };

  return (
    <Layout gap="medium">
      <img className={styles.coverImg} src={coverImg} alt="" />
      <Layout gap="small">
        <Input
          id="api-key"
          onChange={handleInput}
          value={inputValue}
          placeholder="API Key"
        />
        <Button
          disabled={!inputValue}
          onClick={handleApply}
          label="Apply key"
        />
      </Layout>
      <span className="caption">
        If you don't have an API key yet, get it by{" "}
        <a
          href="https://beta.openai.com/signup/"
          target="_blank"
          className="link"
        >
          signing up
        </a>{" "}
        on the OpenAI website and generating an API key through your account
        dashboard.
      </span>
    </Layout>
  );
};
