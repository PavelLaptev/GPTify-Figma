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
import { useViewStore, useApiKeysStore } from "./store";

import styles from "./app.module.scss";

const App = () => {
  const wrapRef = React.useRef<HTMLDivElement>(null);

  const { view, setView } = useViewStore();
  const { setApiKey } = useApiKeysStore();

  useResize(wrapRef, view);

  React.useEffect(() => {
    parent.postMessage({ pluginMessage: { type: "get-api-key" } }, "*");

    window.onmessage = (event) => {
      const msg = event.data.pluginMessage;

      if (msg.type === "get-api-key") {
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
        return <Launch />;

      case "text":
        return <Text />;
      case "translate":
        return <Translate />;
      case "dates":
        return <Dates />;
      case "currency":
        return <Currency />;
      case "text-compose":
        return <TextCompose />;
      case "tone-of-voice":
        return <ToneOfVoice />;
      case "text-edits":
        return <TextEdits />;
      case "settings":
        return <Settings />;

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
