import React from "react";
import {
  Input,
  Button,
  Layout,
  HeaderWrap,
  HeaderTabs,
  List,
} from "../../components";
import styles from "./styles.module.scss";

interface Props {
  setView: (view: viewsType) => void;
}

export const Text: React.FC<Props> = (props) => {
  return (
    <Layout gap="medium">
      <HeaderWrap setView={props.setView}>
        <HeaderTabs currentTab="text" setView={props.setView} />
      </HeaderWrap>
      <p className="caption">
        You can modify existing text or generate new by selecting one of the
        available options below.
      </p>
      <List
        options={[
          {
            label: "Translate",
            onClick: () => {
              props.setView("translate");
            },
          },
          {
            label: "Currency",
            onClick: () => {
              props.setView("currency");
            },
          },
          {
            label: "Dates",
            onClick: () => {
              props.setView("dates");
            },
          },
          {
            label: "Tone of voice",
            onClick: () => {
              props.setView("tone-of-voice");
            },
          },
          {
            label: "Custom prompt",
            onClick: () => {
              props.setView("custom-prompt");
            },
          },
        ]}
      />
    </Layout>
  );
};
