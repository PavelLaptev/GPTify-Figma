import React from "react";
import styles from "./styles.module.scss";

interface Props {
  id: string;
  className?: string;
  checked?: boolean;
  label?: string;
  helperText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TickMark: React.FC = () => (
  <svg
    width="12"
    height="9"
    viewBox="0 0 12 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.tickMark}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.6926 1.7214L4.75003 8.38623L0.307495 4.1214L1.69256 2.67863L4.75003 5.61379L10.3075 0.278625L11.6926 1.7214Z"
      fill="var(--color-white)"
    />
  </svg>
);

export const Checkbox: React.FC<Props> = (props) => {
  const [checked, setChecked] = React.useState(props.checked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    props.onChange && props.onChange(e);
  };

  return (
    <label htmlFor={props.id} className={`${styles.wrap} ${props.className}`}>
      <div
        className={`${styles.checkboxInput} ${checked ? styles.checked : ""}`}
      >
        <input
          id={props.id}
          name={props.id}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        <TickMark />
      </div>

      <div className={styles.text}>
        {props.label && <span className={styles.label}>{props.label}</span>}
        {props.helperText && (
          <span className={"caption"}>{props.helperText}</span>
        )}
      </div>
    </label>
  );
};

Checkbox.defaultProps = {
  className: "",
};
