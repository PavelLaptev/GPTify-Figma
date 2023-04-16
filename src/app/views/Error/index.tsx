import React from "react";
import { Button, Layout, HeaderWrap, HeaderBack } from "../../components";

import styles from "./styles.module.scss";

interface Props {
  setView: (view: viewsType) => void;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
}

export const Error: React.FC<Props> = (props) => {
  return (
    <Layout gap="null">
      <Layout gap="medium">
        <HeaderWrap setView={props.setView}>
          <HeaderBack
            onClick={() => {
              props.setView("text");
              props.setErrorMessage("");
            }}
            label=""
          />
        </HeaderWrap>
        <div className={styles.errorMessage}>
          <p className={styles.errorText}>{props.errorMessage}</p>
        </div>
        <Button
          tag="a"
          href="https://github.com/PavelLaptev/GPTify-Figma/issues"
          target="_blank"
          rel="noopener noreferrer"
          label="Report issue"
        />
      </Layout>
    </Layout>
  );
};
