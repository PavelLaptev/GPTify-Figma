import React from "react";
import styles from "./styles.module.scss";

interface Props {
  className?: string;
  label?: string;
  onClick: () => void;
  disabled?: boolean;
}

// Add parent class for sub-components
export const Button: React.FC<Props> = (props) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${styles.button} ${props.className}`}
    >
      <span>{props.label}</span>
    </button>
  );
};

Button.defaultProps = {
  className: "",
  label: "Button",
};
