import React from "react";
import styles from "./styles.module.scss";

interface Props {
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
      <div className={styles.text}>
        {props.label && <label className={styles.label}>{props.label}</label>}
        {props.helperText && (
          <span className={"caption"}>{props.helperText}</span>
        )}
      </div>

      <input
        className={styles.input}
        value={value}
        min={props.min}
        max={props.max}
        type={props.type}
        disabled={props.disabled}
        onChange={handleChange}
        placeholder={props.placeholder}
      />
    </div>
  );
};

Input.defaultProps = {
  className: "",
  value: "",
  label: "",
  type: "text",
};
