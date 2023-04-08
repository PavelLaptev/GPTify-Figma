import React from "react";
import { Layout, ListItem } from "..";

interface Props {
  className?: string;
  options?: {
    label: string;
    onClick: () => void;
  }[];
}

// Add parent class for sub-components
export const List: React.FC<Props> = (props) => {
  return (
    <Layout gap="null" className={`${props.className}`}>
      {props.options?.map((option) => (
        <ListItem
          key={option.label}
          label={option.label}
          onClick={option.onClick}
        />
      ))}
    </Layout>
  );
};

List.defaultProps = {
  className: "",
};
