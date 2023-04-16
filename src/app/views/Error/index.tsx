import React from "react";
import { Button, Layout, HeaderWrap, HeaderBack } from "../../components";

interface Props {
  apiKey: string;
  setView: (view: viewsType) => void;
}

export const Error: React.FC<Props> = (props) => {
  return (
    <Layout gap="null">
      <Layout gap="medium">
        <HeaderWrap setView={props.setView}>
          <HeaderBack
            onClick={() => {
              props.setView("text");
            }}
            label="Dates"
          />
        </HeaderWrap>
        <p className="caption">
          Using this prompt, you can convert any dates to your preferred format.
        </p>
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
