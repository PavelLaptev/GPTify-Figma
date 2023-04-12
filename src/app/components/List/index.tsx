import React from "react";
import { Layout, ListItem } from "..";
import styles from "./styles.module.scss";

interface Props {
  className?: string;
  options?: {
    label: string;
    onClick: () => void;
  }[];
  label?: string;
}

// Add parent class for sub-components
export const List: React.FC<Props> = (props) => {
  return (
    <Layout gap="small" className={`${props.className}`}>
      <h2 className={styles.label}>{props.label}</h2>
      <Layout gap="null">
        {props.options?.map((option) => (
          <ListItem
            key={option.label}
            label={option.label}
            onClick={option.onClick}
          />
        ))}
      </Layout>
    </Layout>
  );
};

List.defaultProps = {
  className: "",
};
