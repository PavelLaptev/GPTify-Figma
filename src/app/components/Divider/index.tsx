import React from "react";
import styles from "./styles.module.scss";

interface Props {
  className?: string;
}

// Add parent class for sub-components
export const Divider: React.FC<Props> = (props) => {
  return <hr className={`${styles.divider} ${props.className}`} />;
};

Divider.defaultProps = {
  className: "",
};
