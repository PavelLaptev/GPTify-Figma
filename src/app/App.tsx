import * as React from "react";
import {
  Loading,
  Translate,
  Launch,
  Text,
  Dates,
  Currency,
  ToneOfVoice,
  TextCompose,
  TextEdits,
  Settings,
} from "./views";
import { useResize } from "./hooks";

import styles from "./app.module.scss";

const App = () => {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = React.useState("");

  const [view, setView] = React.useState<viewsType>("loading");

  useResize(wrapRef, view);

  React.useEffect(() => {
    parent.postMessage({ pluginMessage: { type: "get-api-key" } }, "*");

    window.onmessage = (event) => {
      const msg = event.data.pluginMessage;

      if (msg.type === "get-api-key") {
        console.log("msg", msg);
        if (msg.apiKey) {
          setApiKey(msg.apiKey);
          setView("text");
        } else {
          setView("launch");
        }
      }
    };
  }, []);

  const mountView = () => {
    switch (view) {
      case "launch":
        return <Launch setApiKey={setApiKey} setView={setView} />;

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
      case "text-edits":
        return <TextEdits apiKey={apiKey} setView={setView} />;
      case "settings":
        return <Settings setView={setView} />;

      default:
        return <Loading />;
    }
  };

  return (
    <section className={styles.wrap} ref={wrapRef}>
      {mountView()}
    </section>
  );
};

export default App;
