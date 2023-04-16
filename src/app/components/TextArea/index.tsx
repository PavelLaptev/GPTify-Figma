import React from "react";
import { Layout } from "../Layout";

import styles from "./styles.module.scss";

interface Props {
  id: string;
  className?: string;
  value?: string;
  placeholder?: string;
  label?: string;
  helperText?: string;
  rows?: number;
  disabled?: boolean;
  helperTextPosition?: "top" | "bottom";
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState(props.value);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    props.onChange && props.onChange(e);
  };

  return (
    <div
      className={`${styles.wrap} ${props.className} ${
        props.disabled ? styles.disabled : ""
      } ${props.errorMessage !== "" ? styles.error : ""}`}
    >
      {props.label && (
        <Layout gap="small">
          <label htmlFor={props.id} className={styles.label}>
            {props.label}
          </label>
          {props.helperText && props.helperTextPosition === "top" ? (
            <span className={"caption"}>{props.helperText}</span>
          ) : null}
        </Layout>
      )}

      <textarea
        id={props.id}
        name={props.id}
        className={styles.textarea}
        value={value}
        placeholder={props.placeholder}
        onChange={handleChange}
        rows={props.rows}
      />

      <Layout gap="small">
        {props.helperText && props.helperTextPosition === "bottom" ? (
          <span className="caption">{props.helperText}</span>
        ) : null}
        {props.errorMessage !== "" ? (
          <span className={styles.errorText}>{props.errorMessage}</span>
        ) : null}
      </Layout>
    </div>
  );
};

TextArea.defaultProps = {
  className: "",
  value: "",
  label: "",
  rows: 3,
  helperTextPosition: "bottom",
  errorMessage: "",
};
