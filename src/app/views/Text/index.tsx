import React from "react";
import { Layout, HeaderWrap, HeaderTabs, List } from "../../components";
import { useViewStore } from "./../../store";

export const Text: React.FC = () => {
  const { setView } = useViewStore();

  return (
    <Layout gap="large">
      <HeaderWrap setView={setView}>
        <HeaderTabs currentTab="text" setView={setView} />
      </HeaderWrap>
      <Layout gap="medium">
        <List
          label="Presets"
          options={[
            {
              label: "Translate",
              onClick: () => {
                setView("translate");
              },
            },
            {
              label: "Currency",
              onClick: () => {
                setView("currency");
              },
            },
            {
              label: "Dates",
              onClick: () => {
                setView("dates");
              },
            },
            {
              label: "Tone of Voice",
              onClick: () => {
                setView("tone-of-voice");
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
                setView("text-edits");
              },
            },
            {
              label: "Compose",
              onClick: () => {
                setView("text-compose");
              },
            },
          ]}
        />
      </Layout>
    </Layout>
  );
};
