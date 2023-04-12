import React from "react";
import styles from "../Input/styles.module.scss";

interface Props {
  id: string;
  className?: string;
  value?: string;
  label?: string;
  helperText?: string;
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
      {props.label && (
        <label htmlFor={props.id} className={styles.label}>
          {props.label}
        </label>
      )}

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

      {props.helperText && (
        <span className={"caption"}>{props.helperText}</span>
      )}
    </div>
  );
};

Input.defaultProps = {
  className: "",
  value: "",
  label: "",
  type: "text",
};
