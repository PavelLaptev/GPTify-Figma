import React from "react";
// import { getImageNodes } from "../../../utils";
// import { useOpenAIImageEdit } from "../../hooks";
import { makeEditImageRequest } from "../../../utils";
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

function canvasToBlob(canvas) {
  // Convert the canvas to a Blob object
  return new Promise(function (resolve) {
    canvas.toBlob(function (blob) {
      resolve(blob);
    }, "image/png");
  }) as Promise<Blob>;
}
function scaleBase64ImageToCanvas(
  base64Img,
  canvas,
  setResizedOriginalImageData
) {
  const img = new Image();
  img.src = base64Img;

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
    ctx.globalCompositeOperation = "destination-over";

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw image on canvas with scaled dimensions
    ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

    // Fill canvas with white color
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // set scaled PNG image from canvas
    // const dataURI = canvas.toDataURL("image/png");
    // setResizedOriginalImageData(dataURI);

    // convert canvas to blob
    canvasToBlob(canvas).then(function (blob) {
      // set blob as resized original image data
      setResizedOriginalImageData(blob);
    });

    // eraseCanvasWithBrush(canvas, 20);
    console.log("image loaded");

    eraseCanvasWithBrush(canvas, 20);

    // ctx.globalCompositeOperation = "destination-over";
  };
}

function eraseCanvasWithBrush(canvas, brushSize) {
  const ctx = canvas.getContext("2d");

  // Set global composite operation to 'destination-out'
  // This makes the brush erase pixels instead of draw
  ctx.globalCompositeOperation = "destination-out";

  // Add event listeners to track mouse movements and clicks
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", continueDrawing);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("click", eraseOnClick);

  // Variables to track the state of the drawing
  let isDrawing = false;
  let lastX, lastY;

  function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }

  function continueDrawing(e) {
    if (!isDrawing) return;

    const [x, y] = [e.offsetX, e.offsetY];

    // Calculate distance between last point and current point
    const distance = Math.sqrt((x - lastX) ** 3 + (y - lastY) ** 3);

    // Calculate the number of steps needed to fill the gap between points
    const steps = Math.ceil(distance / brushSize);

    // Calculate the increment for each step
    const incrementX = (x - lastX) / steps;
    const incrementY = (y - lastY) / steps;

    // Draw the erasing brush in each step between points
    for (let i = 0; i < steps; i++) {
      ctx.beginPath();
      ctx.arc(
        lastX + i * incrementX,
        lastY + i * incrementY,
        brushSize / 2,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }

    [lastX, lastY] = [x, y];
  }

  function stopDrawing() {
    isDrawing = false;
  }

  function eraseOnClick(e) {
    const [x, y] = [e.offsetX, e.offsetY];
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, 2 * Math.PI);
    ctx.fill();
  }
}

const eraseIfImageNotSet = (canvas) => {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export const EditImage: React.FC<TextEditsViewProps> = (props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const [showInConsole, setShowInConsole] = React.useState(false);

  const [prompt, setPrompt] = React.useState("");
  const [imageSize, setImageSize] = React.useState("256");
  const [brushSize, setBrushSize] = React.useState(20);

  const [originalImageData, setOriginalImageData] = React.useState<Blob>(null);
  const [resizedOriginalImageData, setResizedOriginalImageData] =
    React.useState<Blob>(null);

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
        if (imageData) {
          setOriginalImageData(imageData.preview);
        } else {
          setOriginalImageData(null);
        }
      }
    };
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;

    // console.log("imageData", imageData);

    if (originalImageData) {
      scaleBase64ImageToCanvas(
        `data:image/png;base64,${originalImageData}`,
        canvas,
        setResizedOriginalImageData
      );
    } else {
      eraseIfImageNotSet(canvas);
    }
  }, [originalImageData, imageSize]);

  const sendEdits = async () => {
    // convert canvas to PNG image
    const maskImage = await canvasToBlob(canvasRef.current);

    makeEditImageRequest({
      secret: props.apiKey,
      prompt: prompt,
      image: resizedOriginalImageData,
      mask: maskImage,
      size: imageSize,
      setErrorMessage: props.setErrorMessage,
    });

    //     secret: string;
    // prompt: string;
    // image: string;
    // mask: string;
    // size: string;
    // setErrorMessage: (message: string) => void;

    // useOpenAIImageEdit({
    //   showInConsole,
    //   config: {
    //     secret: props.apiKey,
    //     prompt: prompt,
    //     image: resizedOriginalImageData,
    //     mask: dataURL,
    //     size: imageSize,
    //   },
    //   setErrorMessage: props.setErrorMessage,
    // });
  };

  return (
    <Layout gap="medium">
      <HeaderWrap setView={props.setView}>
        <HeaderBack
          onClick={() => {
            props.setView("images");
          }}
          label="Edit Image"
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
          {!originalImageData && (
            <span className={styles.canvasCaption}>
              Select an image to edit
            </span>
          )}
          <canvas
            // className={styles.canvas}
            width={imageSize}
            height={imageSize}
            ref={canvasRef}
            id="canvas"
          />
        </div>

        <RangeInput
          id="brush-range"
          min={3}
          max={100}
          step={1}
          value={brushSize}
          label="Brush size"
          onChange={(value: number) => {
            console.log("value", value);
            setBrushSize(value);
          }}
        />
        <Button onClick={sendEdits} label="Generate images" />

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
