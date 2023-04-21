import React from "react";
import { makeImageRequest } from "../../../utils";
import {
  Input,
  Button,
  Layout,
  Select,
  HeaderWrap,
  HeaderBack,
  ViewGithubSource,
} from "../../components";

export const CreateImages: React.FC<TextEditsViewProps> = (props) => {
  const [prompt, setPrompt] = React.useState("");
  const [imageSize, setImageSize] = React.useState("256");

  const submitRequest = () => {
    makeImageRequest({
      secret: props.apiKey,
      prompt: prompt,
      size: imageSize,
    });
  };

  return (
    <Layout gap="null">
      <Layout gap="medium">
        <HeaderWrap setView={props.setView}>
          <HeaderBack
            onClick={() => {
              props.setView("images");
            }}
            label="Generate Images"
          />
        </HeaderWrap>
        <p className="caption">
          You can generate images using a prompt. Select layers where you want
          to insert the generated images. Or you can generate a new image
          without selecting any layers.
        </p>
        <Layout gap="small">
          <Input
            id="image-prompt"
            type="text"
            label="Prompt"
            placeholder="A cute cat in a hat"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Select
            id="image-size"
            label="Image size"
            value={imageSize}
            onChange={(e) => setImageSize(e.target.value)}
            options={[
              {
                label: "256x256",
                value: "256",
              },
              {
                label: "512x512",
                value: "512",
              },
              {
                label: "1024x1024",
                value: "1024",
              },
            ]}
          />
          <Button onClick={submitRequest} label="Generate images" />
        </Layout>
      </Layout>
      <ViewGithubSource link="https://github.com/PavelLaptev/GPTify-Figma/blob/main/src/app/views/Translate/prompt.ts" />
    </Layout>
  );
};
