import React from "react";
import { Button, Layout, HeaderWrap, HeaderBack } from "../../components";
import { useViewStore, useErrorStore } from "./../../store";

export const Error: React.FC = () => {
  const { setView } = useViewStore();
  const { error } = useErrorStore();

  return (
    <Layout gap="null">
      <Layout gap="medium">
        <HeaderWrap setView={setView}>
          <HeaderBack
            onClick={() => {
              setView("text");
            }}
            label=""
          />
        </HeaderWrap>
        <p className="caption">{error}</p>
        <Button
          tag="a"
          href="https://github.com/PavelLaptev/GPTify-Figma/issues"
          target="_blank"
          rel="noopener noreferrer"
          label="Convert selected"
        />
      </Layout>
    </Layout>
  );
};
