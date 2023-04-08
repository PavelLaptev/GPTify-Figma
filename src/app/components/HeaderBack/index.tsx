import React from "react";
import { Icon } from "..";
import styles from "./styles.module.scss";

interface Props {
  label: string;
  onClick: () => void;
}

export const HeaderBack: React.FC<Props> = (props) => {
  return (
    <section className={styles.wrap} onClick={props.onClick}>
      <div className={styles.icon}>
        <Icon name="arrow-left" />
      </div>
      <h2 className={styles.label}>{props.label}</h2>
    </section>
  );
};
