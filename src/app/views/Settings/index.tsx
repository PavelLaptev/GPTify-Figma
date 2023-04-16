import React from "react";
import {
  Layout,
  HeaderWrap,
  HeaderBack,
  Button,
  Divider,
  Icon,
} from "../../components";

import styles from "./styles.module.scss";

interface Props {
  setView: (view: viewsType) => void;
}

export const Settings: React.FC<Props> = (props) => {
  const handleResetApi = () => {
    parent.postMessage({ pluginMessage: { type: "clear-api-key" } }, "*");
    props.setView("launch");
  };

  return (
    <Layout gap="null">
      <Layout gap="medium">
        <HeaderWrap setView={props.setView} showSettings={false}>
          <HeaderBack
            onClick={() => {
              props.setView("text");
            }}
            label="Settings"
          />
        </HeaderWrap>
        <Button onClick={handleResetApi} label="Reset API key" />
        <p className="caption">
          If uoi have ideas for new features or find bugs, please let me know on{" "}
          <a
            className="link"
            href="https://github.com/PavelLaptev/GPTify-Figma/issues"
            target="_blank"
          >
            Github
          </a>
        </p>
        <Divider />
        <section className={styles.links}>
          <a
            className={styles.link}
            href="https://github.com/PavelLaptev/GPTify-Figma"
            target="_blank"
          >
            <Icon className={styles.icon} name="github" />
            <span>Github</span>
          </a>
          <a
            className={styles.link}
            href="https://twitter.com/pawellaptew"
            target="_blank"
          >
            <Icon className={styles.icon} name="twitter" />
            <span>Twitter</span>
          </a>
        </section>
      </Layout>
    </Layout>
  );
};
