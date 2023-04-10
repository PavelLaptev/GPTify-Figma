import React from "react";
import { Icon } from "..";
import { Divider } from "..";
import styles from "./styles.module.scss";

interface Props {
  link: string;
}

// Add parent class for sub-components
export const ViewGithubSource: React.FC<Props> = (props) => {
  return (
    <section className={styles.wrap}>
      <Divider className={styles.divider} />
      <div className={styles.linkWrap}>
        <Icon
          className={styles.icon}
          name="github"
          color="var(--caption-text-color)"
        />
        <a
          href={props.link}
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          View prompt source
        </a>
      </div>
    </section>
  );
};
