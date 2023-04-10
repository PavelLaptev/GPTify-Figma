import React from "react";
import styles from "./styles.module.scss";

interface Props {
  className?: string;
  value?: string;
  label?: string;
  helperText?: string;
  rows?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState(props.value);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    props.onChange && props.onChange(e);
  };

  return (
    <div className={`${styles.wrap} ${props.className}`}>
      <div className={styles.text}>
        {props.label && <label className={styles.label}>{props.label}</label>}
        {props.helperText && (
          <span className={"caption"}>{props.helperText}</span>
        )}
      </div>

      <textarea
        className={styles.textarea}
        value={value}
        onChange={handleChange}
        rows={props.rows}
      />
    </div>
  );
};

TextArea.defaultProps = {
  className: "",
  value: "",
  label: "",
  rows: 3,
};
