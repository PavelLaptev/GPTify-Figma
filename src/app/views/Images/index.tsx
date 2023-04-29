import React from "react";
import { Layout, HeaderWrap, HeaderTabs, List } from "../../components";

interface Props {
  setView: (view: viewsType) => void;
}

export const Images: React.FC<Props> = (props) => {
  return (
    <Layout gap="large">
      <HeaderWrap setView={props.setView}>
        <HeaderTabs currentTab="images" setView={props.setView} />
      </HeaderWrap>
      <Layout gap="medium">
        <List
          label="Presets"
          options={[
            {
              label: "Profile picture",
              onClick: () => {
                props.setView("profile-picture");
              },
            },
            {
              label: "Animals",
              onClick: () => {
                props.setView("animals");
              },
            },
            {
              label: "Art",
              onClick: () => {
                props.setView("art");
              },
            },
            {
              label: "Anime avatar",
              onClick: () => {
                props.setView("anime-avatar");
              },
            },
          ]}
        />
        <List
          label="Sandbox"
          options={[
            {
              label: "Custom images",
              onClick: () => {
                props.setView("create-images");
              },
            },
          ]}
        />
      </Layout>
    </Layout>
  );
};
