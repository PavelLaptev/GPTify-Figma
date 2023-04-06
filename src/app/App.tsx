import * as React from "react";
import styles from "./app.module.scss";

import { TranslateSection } from "./sections/TranslateSection";

const apiENVKey = process.env.REACT_APP_OPENAI_API_KEY;

const App = () => {
  const [inputValue, setInputValue] = React.useState(apiENVKey);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <section className={styles.wrap}>
      <h1>GPTify</h1>
      <input type="text" onChange={handleInput} value={inputValue} />
      <button>Apply</button>

      <TranslateSection apiKey={inputValue} />
    </section>
  );
};

export default App;
