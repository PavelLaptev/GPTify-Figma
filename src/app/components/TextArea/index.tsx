import React from "react";
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
      }`}
    >
      {props.label && (
        <label htmlFor={props.id} className={styles.label}>
          {props.label}
        </label>
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

      {props.helperText && (
        <span className={"caption"}>{props.helperText}</span>
      )}
    </div>
  );
};

TextArea.defaultProps = {
  className: "",
  value: "",
  label: "",
  rows: 3,
};
