import React from "react";
import {
  Input,
  Button,
  Layout,
  TabsHeader,
  ListItem,
  List,
} from "../../components";
import styles from "./styles.module.scss";

interface Props {
  setView: (view: viewsType) => void;
}

export const Text: React.FC<Props> = (props) => {
  return (
    <Layout gap="medium">
      <TabsHeader onTabChange={props.setView} currentTab="text" />
      <p className="caption">
        You can modify existing text or generate new by selecting one of the
        available options below.
      </p>
      <List
        options={[
          {
            label: "Translate",
            onClick: () => {},
          },
          {
            label: "Currency",
            onClick: () => {},
          },
          {
            label: "Dates",
            onClick: () => {},
          },
          {
            label: "Tone of voice",
            onClick: () => {},
          },
          {
            label: "Generate text",
            onClick: () => {},
          },
        ]}
      />
    </Layout>
  );
};
