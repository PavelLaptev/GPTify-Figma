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
  Images,
  Settings,
  Error,
  CreateImages,
} from "./views";
import { useResize } from "./hooks";

import styles from "./app.module.scss";

const App = () => {
  const wrapRef = React.useRef<HTMLDivElement>(null);

  const [apiKey, setApiKey] = React.useState("");
  const [view, setView] = React.useState<viewsType>("loading");
  const [errorMessage, setErrorMessage] = React.useState("");

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

  React.useEffect(() => {
    if (errorMessage !== "") {
      setView("error");
    }
  }, [errorMessage]);

  const viewProps = {
    apiKey,
    setView,
    setErrorMessage,
  };

  const mountView = () => {
    switch (view) {
      case "launch":
        return <Launch setApiKey={setApiKey} setView={setView} />;

      case "text":
        return <Text setView={setView} />;
      case "translate":
        return <Translate {...viewProps} />;
      case "dates":
        return <Dates {...viewProps} />;
      case "currency":
        return <Currency {...viewProps} />;
      case "text-compose":
        return <TextCompose {...viewProps} />;
      case "tone-of-voice":
        return <ToneOfVoice {...viewProps} />;
      case "text-edits":
        return <TextEdits {...viewProps} />;

      case "images":
        return <Images {...viewProps} />;
      case "create-images":
        return <CreateImages {...viewProps} />;

      case "settings":
        return <Settings setView={setView} />;
      case "error":
        return (
          <Error
            errorMessage={errorMessage}
            setView={setView}
            setErrorMessage={setErrorMessage}
          />
        );

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
