import React from "react";
import styles from "./styles.module.scss";

interface Props {
  className?: string;
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  tag?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

// Add parent class for sub-components
export const Button: React.FC<Props> = (props) => {
  return (
    <props.tag
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${styles.button} ${props.className}`}
      href={props.href}
      target={props.target}
      rel={props.rel}
    >
      <span>{props.label}</span>
    </props.tag>
  );
};

Button.defaultProps = {
  className: "",
  label: "Button",
  tag: "button",
};
