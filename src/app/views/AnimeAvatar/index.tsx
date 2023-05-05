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

export const AnimeAvatar: React.FC<TextEditsViewProps> = (props) => {
  const [isBusy, setIsBusy] = React.useState(false);
  const [imageSize, setImageSize] = React.useState("256");

  // person states
  const [animeStyle, setAnimeStyle] = React.useState("any");

  useOpenAICreateImage({
    config: {
      secret: props.apiKey,
      prompt: prompt(animeStyle),
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
            label="Art"
          />
        </HeaderWrap>
        <Select
          id="anime-style"
          label="Anime style"
          value={animeStyle}
          onChange={(e) => setAnimeStyle(e.target.value)}
          options={[
            {
              label: "Any",
              value: "any",
            },
            {
              label: "Chibi",
              value: "chibi",
            },
            {
              label: "Naruto",
              value: "naruto",
            },
            {
              label: "One Piece",
              value: "one piece",
            },
            {
              label: "Dragon Ball",
              value: "dragon ball",
            },
            {
              label: "Junji Ito",
              value: "junji ito",
            },
            {
              label: "Sailor Moon",
              value: "sailor moon",
            },
            {
              label: "The Yu-Gi-Oh!",
              value: "the yu-gi-oh!",
            },
            {
              label: "Pokemon",
              value: "pokemon",
            },
            {
              label: "Osamu Tezuka",
              value: "osamu tezuka",
            },
            {
              label: "Studio Ghibli",
              value: "studio ghibli",
            },
            {
              label: "Satoshi Kon",
              value: "satoshi kon",
            },
            {
              label: "Akira",
              value: "akira",
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
      <ViewGithubSource link="https://github.com/PavelLaptev/GPTify-Figma/blob/main/src/app/views/AnimeAvatar/prompt.ts" />
    </Layout>
  );
};
