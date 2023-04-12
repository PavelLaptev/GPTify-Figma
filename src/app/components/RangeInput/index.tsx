import React from "react";
import inputStyles from "../Input/styles.module.scss";
import rangeStyles from "./styles.module.scss";

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
    <div className={`${rangeStyles.wrap} ${props.className}`}>
      <div className={rangeStyles.inputWrap}>
        <label
          htmlFor={props.id}
          className={`${inputStyles.label} ${rangeStyles.label}`}
        >
          {props.label}
        </label>
        <input
          id={props.id}
          className={rangeStyles.input}
          value={value.toString()}
          onChange={handleChange}
          type="number"
          min={props.min}
          max={props.max}
        />
      </div>

      <div className={rangeStyles.range}>
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
