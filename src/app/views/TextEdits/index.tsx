import React from "react";
import { useOpenAITextEdit } from "./../../hooks";
import { getTextnodes } from "../../../utils";
import {
  Input,
  Select,
  TextArea,
  RangeInput,
  Button,
  Layout,
  HeaderWrap,
  HeaderBack,
  Divider,
  Checkbox,
} from "../../components";

const modelOptions = {
  "text-davinci-edit-001": {
    label: "Text Davinci",
    value: "text-davinci-edit-001",
    description:
      "'text-davinci-edit-001' is a language model that generates high-quality text on various topics.",
  },
  "code-davinci-edit-001": {
    label: "Code Davinci",
    value: "code-davinci-edit-001",
    description:
      "'code-davinci-edit-001' that model generates functional code and helps developers optimize it.",
  },
};

// Add parent class for sub-components
export const TextEdits: React.FC<TextEditsViewProps> = (props) => {
  const [isBusy, setIsBusy] = React.useState(false);
  const [showInConsole, setShowInConsole] = React.useState(false);
  const [instructionError, setInstructionError] = React.useState("");

  const [config, setConfig] = React.useState({
    model: modelOptions["text-davinci-edit-001"].value,
    instruction: "",
    temperature: 0,
    stopSequences: [],
    topP: 1,
  } as editsModelSettingsType);

  const handleChangeConfig = (
    key: string,
    value: string | number | string[]
  ) => {
    setConfig({ ...config, [key]: value });
  };

  const handleSanboxRequest = async () => {
    if (config.instruction === "") {
      setInstructionError("Instruction cannot be empty");
      return;
    }

    getTextnodes(setIsBusy);
  };

  useOpenAITextEdit({
    config: {
      secret: props.apiKey,
      instruction: config.instruction,
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
              props.setView("text");
            }}
            label="Text edits"
          />
        </HeaderWrap>
        <p className="caption">
          This is a sandbox for testing "Complete" models. You can generaete
          completely new text based on a prompt. You can experiment with the API
          using the{" "}
          <a
            href="https://beta.openai.com/docs/api-reference/completions/create"
            target="_blank"
            className="link"
          >
            OpenAI API documentation
          </a>{" "}
          and the{" "}
          <a
            href="https://beta.openai.com/playground"
            target="_blank"
            className="link"
          >
            OpenAI Playground
          </a>
          .
        </p>
        <Divider />
        <Layout gap="medium">
          <Select
            id="model"
            label="Model"
            options={Object.values(modelOptions)}
            value={config.model}
            helperText={modelOptions[config.model].description}
            onChange={(e) => handleChangeConfig("model", e.target.value)}
          />
          <TextArea
            id="instruction"
            label="Instruction"
            placeholder="Turn text into a haiku"
            helperTextPosition="top"
            value={config.instruction}
            errorMessage={instructionError}
            onChange={(e) => {
              setInstructionError("");
              handleChangeConfig("instruction", e.target.value);
            }}
          />
          <Input
            id="stopSequences"
            label="Stop Sequences"
            placeholder="Haiku complete, Mic drop"
            helperText="Separate multiple stop sequences with a comma"
            helperTextPosition="top"
            value={config.stopSequences.join(",")}
            onChange={(e) =>
              handleChangeConfig(
                "stopSequences",
                e.target.value !== "" ? e.target.value.split(",") : []
              )
            }
          />
          <RangeInput
            id="temperature"
            label="Temperature"
            min={0}
            max={1}
            step={0.1}
            value={0.0}
            onChange={(value: number) =>
              handleChangeConfig("temperature", value)
            }
          />
          <RangeInput
            id="topP"
            label="Top P"
            min={0}
            max={1}
            step={0.01}
            value={config.topP}
            onChange={(value: number) => handleChangeConfig("topP", value)}
          />
          <Button
            isBusy={isBusy}
            onClick={handleSanboxRequest}
            label="Generate"
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
