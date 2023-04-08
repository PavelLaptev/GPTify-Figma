import * as React from "react";

import styles from "./styles.module.scss";

interface Props {
  className?: string;
  name?: string;
  color?: string;
}

const iconsData = {
  "arrow-left":
    "M8.29289 15.7071L0.585786 8L8.29289 0.292894L9.70711 1.70711L4.41421 7L16 7L16 9L4.41421 9L9.70711 14.2929L8.29289 15.7071Z",
  "arrow-right":
    "M7.70711 0.292893L15.4142 8L7.70711 15.7071L6.29289 14.2929L11.5858 9L-7.61199e-07 9L-5.86354e-07 7L11.5858 7L6.29289 1.70711L7.70711 0.292893Z",
  settings:
    "M7 2.33182V0H9V2.33182L11.3009 3.28489L12.9497 1.63604L14.364 3.05025L12.7151 4.6991L13.6682 7H16V9H13.6682L12.7151 11.3009L14.364 12.9497L12.9497 14.364L11.3009 12.7151L9 13.6682V16H7V13.6682L4.6991 12.7151L3.05025 14.364L1.63604 12.9497L3.28489 11.3009L2.33182 9L0 9V7L2.33182 7L3.28489 4.6991L1.63604 3.05025L3.05025 1.63604L4.6991 3.28489L7 2.33182ZM8 4.08239L5.22983 5.22983L4.08239 8L5.22983 10.7702L8 11.9176L10.7702 10.7702L11.9176 8L10.7702 5.22983L8 4.08239ZM8 5.91761L9.47247 6.52753L10.0824 8L9.47247 9.47247L8 10.0824L6.52753 9.47247L5.91761 8L6.52753 6.52753L8 5.91761Z",
};

export const Icon: React.FC<Props> = (props) => {
  return (
    <i className={`${styles.wrap} ${props.className}`}>
      <svg
        width="100%"
        height="100%"
        fillRule="evenodd"
        clipRule="evenodd"
        viewBox="0 0 16 16"
        fill={props.color}
      >
        <path d={iconsData[props.name]} />
      </svg>
    </i>
  );
};

Icon.defaultProps = {
  className: "",
  name: "copyLink",
  color: "var(--color-primary)",
} as Partial<Props>;
