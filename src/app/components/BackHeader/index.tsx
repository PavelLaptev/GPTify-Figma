import React from "react";
import styles from "./styles.module.scss";

interface Props {
  className?: string;
  title?: string;
  subtitle?: string;
}

// Add parent class for sub-components
export const BackHeader: React.FC<Props> = (props) => {
  return (
    <section className={`${styles.wrap} ${props.className}`}>
      {props.title && <h2 className={styles.title}>{props.title}</h2>}
      {props.subtitle && <p className={styles.subtitle}>{props.subtitle}</p>}
    </section>
  );
};

BackHeader.defaultProps = {
  className: "",
};
