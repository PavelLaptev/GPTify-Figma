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
  Error,
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

  const editTextProps = {
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
        return <Translate {...editTextProps} />;
      case "dates":
        return <Dates {...editTextProps} />;
      case "currency":
        return <Currency {...editTextProps} />;
      case "text-compose":
        return <TextCompose {...editTextProps} />;
      case "tone-of-voice":
        return <ToneOfVoice {...editTextProps} />;
      case "text-edits":
        return <TextEdits {...editTextProps} />;
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
