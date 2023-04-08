import React from "react";
import { Icon } from "..";
import styles from "./styles.module.scss";

interface Props {
  setView: (view: string) => void;
  children?: React.ReactNode;
}

export const HeaderWrap: React.FC<Props> = (props) => {
  return (
    <header className={styles.wrap}>
      {props.children}
      <button
        className={styles.icon}
        onClick={() => {
          props.setView("settings");
        }}
      >
        <Icon name="settings" />
      </button>
    </header>
  );
};
