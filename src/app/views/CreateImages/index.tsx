import React from "react";
import { getImageNodes } from "../../../utils";
import { useOpenAIImage } from "../../hooks";
import {
  Input,
  Button,
  Layout,
  Select,
  HeaderWrap,
  HeaderBack,
  Divider,
  Checkbox,
} from "../../components";

export const CreateImages: React.FC<TextEditsViewProps> = (props) => {
  const [showInConsole, setShowInConsole] = React.useState(false);
  const [prompt, setPrompt] = React.useState("");
  const [imageSize, setImageSize] = React.useState("256");

  useOpenAIImage({
    config: {
      secret: props.apiKey,
      prompt: prompt,
      size: imageSize,
    },
    setErrorMessage: props.setErrorMessage,
  });

  return (
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
        You can generate images using a prompt. Select layers where you want to
        insert the generated images. Or you can generate a new image without
        selecting any layers.
      </p>
      <Layout gap="medium">
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
        <Layout gap="small">
          <Input
            id="image-prompt"
            type="text"
            label="Prompt"
            placeholder="A cute cat in a hat"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button onClick={getImageNodes} label="Generate images" />
        </Layout>
        <Divider />
        <Checkbox
          id="show-in-console"
          label="Show rusults in console"
          helperText="Press ⌥⌘I to debug and check the payload in the console."
          checked={showInConsole}
          onChange={(e) => setShowInConsole(e.target.checked)}
        />
      </Layout>
    </Layout>
  );
};
