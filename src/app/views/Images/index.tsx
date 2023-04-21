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
          label="Sandbox"
          options={[
            {
              label: "Create images",
              onClick: () => {
                props.setView("create-images");
              },
            },
            {
              label: "Edit image",
              onClick: () => {
                props.setView("edit-image");
              },
            },
          ]}
        />
      </Layout>
    </Layout>
  );
};
