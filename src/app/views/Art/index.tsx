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

export const Art: React.FC<TextEditsViewProps> = (props) => {
  const [isBusy, setIsBusy] = React.useState(false);
  const [imageSize, setImageSize] = React.useState("256");

  // person states
  const [artStyle, setArtStyle] = React.useState("any");
  const [artSubject, setArtSubject] = React.useState("any");

  useOpenAICreateImage({
    config: {
      secret: props.apiKey,
      prompt: prompt(artStyle, artSubject),
      size: imageSize,
    },
    setErrorMessage: props.setErrorMessage,
    setIsBusy,
  });

  // console.log(prompt(artStyle, artSubject));

  return (
    <Layout gap="null">
      <Layout gap="medium">
        <HeaderWrap setView={props.setView}>
          <HeaderBack
            onClick={() => {
              props.setView("images");
            }}
            label="Art"
          />
        </HeaderWrap>
        <Select
          id="art-style"
          label="Style"
          value={artStyle}
          onChange={(e) => setArtStyle(e.target.value)}
          options={[
            {
              label: "Any",
              value: "any",
            },
            {
              value: "abstract expressionism",
              label: "Abstract Expressionism",
            },
            { value: "art deco", label: "Art Deco" },
            { value: "baroque", label: "Baroque" },
            { value: "cubism", label: "Cubism" },
            { value: "dadaism", label: "Dadaism" },
            { value: "expressionism", label: "Expressionism" },
            { value: "fauvism", label: "Fauvism" },
            { value: "impressionism", label: "Impressionism" },
            { value: "minimalism", label: "Minimalism" },
            { value: "pop art", label: "Pop Art" },
            { value: "post-impressionism", label: "Post-Impressionism" },
            { value: "realism", label: "Realism" },
            { value: "renaissance", label: "Renaissance" },
            { value: "rococo", label: "Rococo" },
            { value: "surrealism", label: "Surrealism" },
          ]}
        />
        <Select
          id="art-subject"
          label="Subject"
          value={artSubject}
          onChange={(e) => setArtSubject(e.target.value)}
          options={[
            {
              label: "Any",
              value: "any",
            },
            { value: "painting", label: "Painting" },
            { value: "architecture", label: "Architecture" },
            { value: "animals", label: "Animals" },
            { value: "cityscapes", label: "Cityscapes" },
            { value: "sculpture", label: "Sculpture" },
            { value: "fantasy", label: "Fantasy" },
            { value: "food", label: "Food" },
            { value: "landscapes", label: "Landscapes" },
            { value: "nature", label: "Nature" },
            { value: "people", label: "People" },
            { value: "portraits", label: "Portraits" },
            { value: "seascapes", label: "Seascapes" },
            { value: "space", label: "Space" },
            { value: "vehicles", label: "Vehicles" },
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
      <ViewGithubSource link="https://github.com/PavelLaptev/GPTify-Figma/blob/main/src/app/views/Art/prompt.ts" />
    </Layout>
  );
};
