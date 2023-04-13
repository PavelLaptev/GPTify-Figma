import React from "react";
import styles from "../Input/styles.module.scss";

interface Props {
  id: string;
  className?: string;
  label?: string;
  helperText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<Props> = (props) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    props.onChange && props.onChange(e);
  };

  return (
    <div className={`${styles.wrap} ${props.className}`}>
      <input
        id={props.id}
        name={props.id}
        className={styles.input}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <div>
        {props.label && (
          <label htmlFor={props.id} className={styles.label}>
            {props.label}
          </label>
        )}
        {props.helperText && (
          <span className={"caption"}>{props.helperText}</span>
        )}
      </div>
    </div>
  );
};

Checkbox.defaultProps = {
  className: "",
};
