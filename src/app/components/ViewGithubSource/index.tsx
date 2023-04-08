import React from "react";
import { Icon } from "..";
import styles from "./styles.module.scss";

interface Props {
  link: string;
}

// Add parent class for sub-components
export const ViewGithubSource: React.FC<Props> = (props) => {
  return (
    <div className={styles.wrap}>
      <Icon
        className={styles.icon}
        name="github"
        color="var(--caption-text-color)"
      />
      <a href={props.link} target="_blank" rel="noreferrer">
        View prompt source
      </a>
    </div>
  );
};
