import * as React from "react";
import styles from "./app.module.scss";
import { Configuration, OpenAIApi } from "openai";

import { TranslateSection } from "./sections/TranslateSection";

const apiENVKey = process.env.REACT_APP_OPENAI_API_KEY;

const App = () => {
  const [inputValue, setInputValue] = React.useState(apiENVKey);
  const [openaiApiConfig, setOpenaiApiConfig] = React.useState<OpenAIApi>();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleApply = () => {
    const configuration = new Configuration({
      apiKey: inputValue,
    });

    const openai: OpenAIApi = new OpenAIApi(configuration);
    setOpenaiApiConfig(openai);
  };

  return (
    <section className={styles.wrap}>
      <h1>GPTify</h1>
      <input type="text" onChange={handleInput} value={inputValue} />
      <button onClick={handleApply}>Apply</button>

      {openaiApiConfig && <TranslateSection api={openaiApiConfig} />}
    </section>
  );
};

export default App;
