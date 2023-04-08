import React from "react";
import styles from "./styles.module.scss";

interface Props {
  className?: string;
  label?: string;
  onClick: () => void;
  disabled?: boolean;
}

// Add parent class for sub-components
export const EditModel: React.FC<Props> = (props) => {
  return (
    <aside className={`${styles.wrap} ${props.className}`}>
      <span>{props.label}</span>
    </aside>
  );
};

EditModel.defaultProps = {
  className: "",
  label: "Button",
};
