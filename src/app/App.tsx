import * as React from "react";
import styles from "./app.module.scss";
// import { Configuration, OpenAIApi } from "openai";

import { TranslateSection } from "./sections/TranslateSection";

const apiENVKey = process.env.REACT_APP_OPENAI_API_KEY;

const App = () => {
  const [inputValue, setInputValue] = React.useState(apiENVKey);
  const [apiKey, setApiKey] = React.useState(apiENVKey);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleApply = () => {
    setApiKey(inputValue);
  };

  return (
    <section className={styles.wrap}>
      <h1>GPTify</h1>
      <input type="text" onChange={handleInput} value={inputValue} />
      <button onClick={handleApply}>Apply</button>

      {apiKey && <TranslateSection apiKey={apiKey} />}
    </section>
  );
};

export default App;
