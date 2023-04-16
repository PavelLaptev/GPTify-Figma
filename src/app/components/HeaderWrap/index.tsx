import React from "react";
import { Icon } from "..";
import styles from "./styles.module.scss";

interface Props {
  setView: (view: string) => void;
  children?: React.ReactNode;
  showSettings?: boolean;
}

export const HeaderWrap: React.FC<Props> = (props) => {
  return (
    <header className={styles.wrap}>
      {props.children}
      {props.showSettings && (
        <button
          className={styles.iconButton}
          onClick={() => {
            props.setView("settings");
          }}
        >
          <Icon className={styles.icon} name="settings" />
        </button>
      )}
    </header>
  );
};

HeaderWrap.defaultProps = {
  showSettings: true,
};
