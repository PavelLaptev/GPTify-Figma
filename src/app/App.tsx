import * as React from "react";
import { Translate, Launch, Text, TextSandbox } from "./views";
import { useResize } from "./hooks";

import styles from "./app.module.scss";

const App = () => {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = React.useState("");

  const [view, setView] = React.useState<viewsType>("launch");

  useResize(wrapRef, view);

  const mountView = () => {
    switch (view) {
      case "translate":
        return <Translate apiKey={apiKey} setView={setView} />;
      case "text":
        return <Text setView={setView} />;
      case "sandbox":
        return <TextSandbox apiKey={apiKey} setView={setView} />;
      default:
        return <Launch setApiKey={setApiKey} setView={setView} />;
    }
  };

  return (
    <section className={styles.wrap} ref={wrapRef}>
      {mountView()}
    </section>
  );
};

export default App;
