import React from "react";
import { Layout, HeaderWrap, HeaderTabs, List } from "../../components";

interface Props {
  setView: (view: viewsType) => void;
}

export const Text: React.FC<Props> = (props) => {
  return (
    <Layout gap="large">
      <HeaderWrap setView={props.setView}>
        <HeaderTabs currentTab="text" setView={props.setView} />
      </HeaderWrap>
      <Layout gap="medium">
        <List
          label="Presets"
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
              label: "Tone of Voice",
              onClick: () => {
                props.setView("tone-of-voice");
              },
            },
          ]}
        />
        <List
          label="Sandbox"
          options={[
            {
              label: "Text edits",
              onClick: () => {
                props.setView("text-edits");
              },
            },
            {
              label: "Compose",
              onClick: () => {
                props.setView("text-compose");
              },
            },
          ]}
        />
      </Layout>
    </Layout>
  );
};
