import React from "react";
import { getImageNodes } from "../../../utils";
import { useOpenAICreateImage } from "../../hooks";
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
  const [isBusy, setIsBusy] = React.useState(false);
  const [showInConsole, setShowInConsole] = React.useState(false);
  const [prompt, setPrompt] = React.useState("");
  const [imageSize, setImageSize] = React.useState("256");

  useOpenAICreateImage({
    showInConsole,
    config: {
      secret: props.apiKey,
      prompt: prompt,
      size: imageSize,
    },
    setErrorMessage: props.setErrorMessage,
    setIsBusy,
  });

  return (
    <Layout gap="medium">
      <HeaderWrap setView={props.setView}>
        <HeaderBack
          onClick={() => {
            props.setView("images");
          }}
          label="Custom images"
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
          <Button
            isBusy={isBusy}
            onClick={() => getImageNodes(setIsBusy)}
            label="Generate images"
          />
        </Layout>
        <Divider />
        <Checkbox
          id="show-in-console"
          label="Show results in the console"
          helperText="Press ⌥⌘I to debug and check the payload in the console."
          checked={showInConsole}
          onChange={(e) => setShowInConsole(e.target.checked)}
        />
      </Layout>
    </Layout>
  );
};
