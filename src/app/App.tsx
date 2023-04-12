import * as React from "react";
import {
  Translate,
  Launch,
  Text,
  Dates,
  Currency,
  TextCompose,
  ToneOfVoice,
} from "./views";
import { useResize } from "./hooks";

import styles from "./app.module.scss";

const App = () => {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = React.useState("");

  const [view, setView] = React.useState<viewsType>("launch");

  useResize(wrapRef, view);

  const mountView = () => {
    switch (view) {
      case "text":
        return <Text setView={setView} />;
      case "translate":
        return <Translate apiKey={apiKey} setView={setView} />;
      case "dates":
        return <Dates apiKey={apiKey} setView={setView} />;
      case "currency":
        return <Currency apiKey={apiKey} setView={setView} />;
      case "text-compose":
        return <TextCompose apiKey={apiKey} setView={setView} />;
      case "tone-of-voice":
        return <ToneOfVoice apiKey={apiKey} setView={setView} />;
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
