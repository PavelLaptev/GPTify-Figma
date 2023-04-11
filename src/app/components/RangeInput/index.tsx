import React from "react";
import { Input } from "../Input";
import styles from "./styles.module.scss";

interface Props {
  id: string;
  className?: string;
  value: number;
  label: string;
  helperText?: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

export const RangeInput: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState(props.value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setValue(value);
    props.onChange && props.onChange(value);
  };

  return (
    <div className={`${styles.wrap} ${props.className}`}>
      <Input
        id={props.id}
        className={styles.input}
        value={value.toString()}
        onChange={handleChange}
        helperText={props.helperText}
        label={props.label}
        type="number"
        min={props.min}
        max={props.max}
      />
      <div className={styles.range}>
        <input
          type="range"
          value={value}
          onChange={handleChange}
          min={props.min}
          max={props.max}
          step={props.step}
        />
      </div>
    </div>
  );
};

RangeInput.defaultProps = {
  className: "",
};
