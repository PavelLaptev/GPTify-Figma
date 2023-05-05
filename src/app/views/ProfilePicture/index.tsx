import React from "react";
import { getImageNodes } from "../../../utils";
import { useOpenAICreateImage } from "../../hooks";
import {
  Button,
  RangeInput,
  Layout,
  Select,
  HeaderWrap,
  HeaderBack,
  ViewGithubSource,
} from "../../components";

import { prompt } from "./prompt";

export const ProfilePicture: React.FC<TextEditsViewProps> = (props) => {
  const [isBusy, setIsBusy] = React.useState(false);
  const [imageSize, setImageSize] = React.useState("256");

  // person states
  const [sex, setSex] = React.useState("any");
  const [age, setAge] = React.useState(30);
  const [ethnicGroups, setEthnicGroups] = React.useState("any");
  const [hairColor, setHairColor] = React.useState("any");

  useOpenAICreateImage({
    config: {
      secret: props.apiKey,
      prompt: prompt(ethnicGroups, sex, age, hairColor),
      size: imageSize,
    },
    setErrorMessage: props.setErrorMessage,
    setIsBusy,
  });

  // console.log(prompt(ethnicGroups, sex, age, hairColor));

  return (
    <Layout gap="null">
      <Layout gap="medium">
        <HeaderWrap setView={props.setView}>
          <HeaderBack
            onClick={() => {
              props.setView("images");
            }}
            label="Profile picture"
          />
        </HeaderWrap>
        <Select
          id="sex"
          label="Sex"
          value={imageSize}
          onChange={(e) => setSex(e.target.value)}
          options={[
            {
              label: "Any",
              value: "any",
            },
            {
              label: "Male",
              value: "male",
            },
            {
              label: "Female",
              value: "female",
            },
          ]}
        />
        <Select
          id="ethnic-groups"
          label="Ethnic groups"
          value={imageSize}
          onChange={(e) => setEthnicGroups(e.target.value)}
          options={[
            { value: "any", label: "Any" },
            { value: "white", label: "White" },
            {
              value: "black or african american",
              label: "Black or African American",
            },
            { value: "asian", label: "Asian" },
            { value: "hispanic or latino", label: "Hispanic or Latino" },
            {
              value: "native american or alaska native",
              label: "Native American or Alaska Native",
            },
            {
              value: "hawaiian or other pacific islander",
              label: "Native Hawaiian or Other Pacific Islander",
            },
            { value: "mixed or multiracial", label: "Mixed or Multiracial" },
          ]}
        />
        <RangeInput
          id="age"
          label="Age"
          value={age}
          onChange={(value) => setAge(value)}
          step={1}
          min={5}
          max={100}
        />
        <Select
          id="hair-color"
          label="Hair color"
          value={hairColor}
          onChange={(e) => setHairColor(e.target.value)}
          options={[
            {
              label: "Any",
              value: "any",
            },
            {
              label: "Brown",
              value: "brown",
            },
            {
              label: "Black",
              value: "black",
            },
            {
              label: "Blonde",
              value: "blonde",
            },
            {
              label: "Red",
              value: "red",
            },
            {
              label: "White",
              value: "white",
            },
            {
              label: "Gray",
              value: "gray",
            },
            {
              label: "Velvet",
              value: "velvet",
            },
            {
              label: "Pink",
              value: "pink",
            },
            {
              label: "Purple",
              value: "purple",
            },
            {
              label: "Lilac",
              value: "lilac",
            },
            {
              label: "Blue",
              value: "blue",
            },
            {
              label: "Green",
              value: "green",
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
      <ViewGithubSource link="https://github.com/PavelLaptev/GPTify-Figma/blob/main/src/app/views/ProfilePicture/prompt.ts" />
    </Layout>
  );
};
