import React from "react";
import inputStyles from "../Input/styles.module.scss";
import selectStyles from "./styles.module.scss";

interface Props {
  id: string;
  className?: string;
  value?: string;
  label?: string;
  helperText?: string;
  placeholder?: string;
  disabled?: boolean;
  options: { value: string; label: string }[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState(props.value);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    props.onChange && props.onChange(e);
  };

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <div className={`${inputStyles.wrap} ${props.className}`}>
      {props.label && (
        <label htmlFor={props.id} className={inputStyles.label}>
          {props.label}
        </label>
      )}

      <select
        id={props.id}
        name={props.id}
        className={`${inputStyles.input} ${selectStyles.select}`}
        value={value}
        disabled={props.disabled}
        onChange={handleChange}
        placeholder={props.placeholder}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {props.helperText && (
        <span className={"caption"}>{props.helperText}</span>
      )}
    </div>
  );
};

Select.defaultProps = {
  className: "",
  value: "",
  label: "",
};
