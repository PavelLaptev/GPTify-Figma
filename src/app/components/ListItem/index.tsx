import React from "react";
import { Icon } from "..";
import styles from "./styles.module.scss";

interface Props {
  className?: string;
  label?: string;
  onClick: () => void;
}

// Add parent class for sub-components
export const ListItem: React.FC<Props> = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`${styles.item} ${props.className}`}
    >
      <span className={styles.label}>{props.label}</span>
      <Icon className={styles.icon} name="arrow-right" />
    </div>
  );
};

ListItem.defaultProps = {
  className: "",
  label: "Button",
};
