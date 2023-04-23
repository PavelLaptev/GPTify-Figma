import React from "react";
import { getImageNodes } from "../../../utils";
import {
  Input,
  Button,
  Layout,
  Select,
  HeaderWrap,
  HeaderBack,
  RangeInput,
  Divider,
  Checkbox,
} from "../../components";
import styles from "./styles.module.scss";

function scaleBase64ImageToCanvas(base64Img, canvas) {
  const img = new Image();
  img.src = base64Img;

  return new Promise((resolve, reject) => {
    img.onload = function () {
      const imgWidth = img.width;
      const imgHeight = img.height;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Calculate aspect ratio
      const aspectRatio = imgWidth / imgHeight;

      // Calculate scaled dimensions based on aspect ratio
      let scaledWidth, scaledHeight;
      if (aspectRatio > 1) {
        scaledWidth = canvasWidth;
        scaledHeight = scaledWidth / aspectRatio;
      } else {
        scaledHeight = canvasHeight;
        scaledWidth = scaledHeight * aspectRatio;
      }

      // Calculate position to center the image
      const x = (canvasWidth - scaledWidth) / 2;
      const y = (canvasHeight - scaledHeight) / 2;

      // Get canvas context
      const ctx = canvas.getContext("2d");

      // Clear canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Draw image on canvas with scaled dimensions
      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

      // Get base64 representation of canvas content
      const canvasData = canvas.toDataURL();

      // Resolve with the scaled image data
      resolve(canvasData);
    };

    img.onerror = function () {
      reject("Error loading image");
    };
  });
}

export const EditImage: React.FC<TextEditsViewProps> = (props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const [showInConsole, setShowInConsole] = React.useState(false);
  const [prompt, setPrompt] = React.useState("");
  const [imageSize, setImageSize] = React.useState("256");
  const [isImageSet, setIsImageSet] = React.useState(false);

  React.useEffect(() => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "get-selected-image",
        },
      },
      "*"
    );

    window.onmessage = (event) => {
      const { type, imageData } = event.data.pluginMessage;

      if (type === "set-selected-image") {
        const canvas = canvasRef.current;

        if (canvas) {
          scaleBase64ImageToCanvas(
            `data:image/png;base64,${imageData.preview}`,
            canvas
          ).then(() => {
            setIsImageSet(true);
          });
        }
      }
    };
  }, []);

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
        Allows you to edit an image by uploading a mask. The masked areas
        indicate where the image should be edited, and the prompt should
        describe the full new image,{" "}
        <span style={{ fontWeight: "bold" }}>not just the erased area</span>.
        Here is a{" "}
        <a
          className="link"
          href="https://platform.openai.com/docs/guides/images/edits"
          target="_blank"
        >
          tutorial
        </a>{" "}
        on how to use this feature.
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
        <Input
          id="image-prompt"
          type="text"
          label="Prompt"
          placeholder="A cute cat in a hat"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <div className={styles.canvasWrap}>
          {!isImageSet && (
            <span className={styles.canvasCaption}>
              Select an image to edit
            </span>
          )}
          <canvas
            className={styles.canvas}
            width={290}
            height={290}
            ref={canvasRef}
            id="canvas"
          />
        </div>

        <RangeInput
          id="brush-range"
          min={3}
          max={100}
          step={1}
          value={20}
          label="Brush size"
          onChange={(value: number) => {
            console.log(value);
          }}
        />
        <Button onClick={getImageNodes} label="Generate images" />

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
