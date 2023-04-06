import * as React from "react";
import styles from "./app.module.scss";

import { TranslateSection } from "./sections/TranslateSection";

const App = () => {
  return (
    <section className={styles.wrap}>
      <h1>GPTify</h1>
      <TranslateSection />
    </section>
  );
};

export default App;
