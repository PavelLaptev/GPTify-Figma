import React from "react";
import { Layout } from "../Layout";

import styles from "../Input/styles.module.scss";

interface Props {
  id: string;
  className?: string;
  value?: string;
  label?: string;
  helperText?: string;
  helperTextPosition?: "top" | "bottom";
  placeholder?: string;
  type?: "text" | "number";
  min?: number;
  max?: number;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState(props.value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    props.onChange && props.onChange(e);
  };

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <div className={`${styles.wrap} ${props.className}`}>
      <Layout gap="small">
        {props.label && (
          <label htmlFor={props.id} className={styles.label}>
            {props.label}
          </label>
        )}
        {props.helperText && props.helperTextPosition === "top" ? (
          <span className={"caption"}>{props.helperText}</span>
        ) : null}
      </Layout>

      <input
        id={props.id}
        name={props.id}
        className={styles.input}
        value={value}
        min={props.min}
        max={props.max}
        type={props.type}
        disabled={props.disabled}
        onChange={handleChange}
        placeholder={props.placeholder}
      />

      {props.helperText && props.helperTextPosition === "bottom" ? (
        <span className={"caption"}>{props.helperText}</span>
      ) : null}
    </div>
  );
};

Input.defaultProps = {
  className: "",
  value: "",
  label: "",
  type: "text",
  helperTextPosition: "bottom",
};
