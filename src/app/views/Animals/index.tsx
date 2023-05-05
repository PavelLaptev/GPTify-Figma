import React from "react";
import { getImageNodes } from "../../../utils";
import { useOpenAICreateImage } from "../../hooks";
import {
  Button,
  Layout,
  Select,
  HeaderWrap,
  HeaderBack,
  ViewGithubSource,
} from "../../components";

import { prompt } from "./prompt";

export const Animals: React.FC<TextEditsViewProps> = (props) => {
  const [isBusy, setIsBusy] = React.useState(false);
  const [imageSize, setImageSize] = React.useState("256");

  // person states
  const [animal, setAnimal] = React.useState("any");

  useOpenAICreateImage({
    config: {
      secret: props.apiKey,
      prompt: prompt(animal),
      size: imageSize,
    },
    setErrorMessage: props.setErrorMessage,
    setIsBusy,
  });

  return (
    <Layout gap="null">
      <Layout gap="medium">
        <HeaderWrap setView={props.setView}>
          <HeaderBack
            onClick={() => {
              props.setView("images");
            }}
            label="Animals"
          />
        </HeaderWrap>

        <Select
          id="animal"
          label="Animal"
          value={imageSize}
          onChange={(e) => setAnimal(e.target.value)}
          options={[
            {
              label: "Any",
              value: "any",
            },
            {
              label: "Dog",
              value: "dog",
            },
            {
              label: "Cat",
              value: "cat",
            },
            {
              label: "Bird",
              value: "bird",
            },
            {
              label: "Horse",
              value: "horse",
            },
            {
              label: "Fish",
              value: "fish",
            },
            {
              label: "Snake",
              value: "snake",
            },
            {
              label: "Cow",
              value: "cow",
            },
            {
              label: "Pig",
              value: "pig",
            },
            {
              label: "Monkey",
              value: "monkey",
            },
            {
              label: "Goose",
              value: "goose",
            },
            {
              label: "Chicken",
              value: "chicken",
            },
          ]}
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
        <Button
          isBusy={isBusy}
          onClick={() => getImageNodes(setIsBusy)}
          label="Generate images"
        />
      </Layout>
      <ViewGithubSource link="https://github.com/PavelLaptev/GPTify-Figma/blob/main/src/app/views/Animals/prompt.ts" />
    </Layout>
  );
};
