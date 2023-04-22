import React from "react";
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
  "text-davinci-003": {
    label: "Davinci",
    value: "text-davinci-003",
    description:
      "The largest and most powerful model, capable of producing highly creative and coherent text in various styles and genres.",
  },
  "text-curie-001": {
    label: "Curie",
    value: "text-curie-001",
    description:
      "Optimized for natural language processing tasks like question answering and dialogue generation, capable of producing conversational-style text.",
  },
  "text-babbage-001": {
    label: "Babbage",
    value: "text-babbage-001",
    description:
      "Designed for general-purpose natural language processing tasks like language modeling and text classification.",
  },
  "text-ada-001": {
    label: "Ada",
    value: "text-ada-001",
    description:
      "Optimized for multitask learning, meaning it can perform well on a variety of different natural language processing tasks at once.",
  },
};

// Add parent class for sub-components
export const TextCompose: React.FC<TextEditsViewProps> = (props) => {
  const [showInConsole, setShowInConsole] = React.useState(false);
  const [promptError, setPromptError] = React.useState("");

  const [config, setConfig] = React.useState({
    model: modelOptions["text-davinci-003"].value,
    prompt: "",
    temperature: 0,
    stopSequences: [],
    topP: 1,
    frequencyPenalty: 1,
    presencePenalty: 1,
    maximumTokens: 150,
    n: 1,
    variantToUse: 1,
  } as composeModelSettingsType);

  const handleChangeConfig = (
    key: string,
    value: string | number | string[]
  ) => {
    setConfig({ ...config, [key]: value });
  };

  const handleSanboxRequest = async () => {
    if (config.prompt === "") {
      setPromptError("Prompt cannot be empty");
      return;
    }

    parent.postMessage({ pluginMessage: { type: "get-textnodes" } }, "*");
  };

  const generatePromptString = (text: string, prompt: string) => {
    // if prompt contains ${text} replace it with the text
    return prompt.replace("${text}", text);
  };

  React.useEffect(() => {
    window.onmessage = async (event) => {
      const msg = event.data.pluginMessage;

      if (msg.type === "get-textnodes") {
        const textObjects = msg.textObjects;

        textObjects.forEach(async (textObject) => {
          const requestConfig = {
            model: config.model,
            prompt: generatePromptString(textObject.text, config.prompt),
            max_tokens: config.maximumTokens,
            temperature: config.temperature,
            top_p: config.topP,
            n: config.n,
            frequency_penalty: config.frequencyPenalty,
            presence_penalty: config.presencePenalty,
            ...((config.stopSequences.length > 0 && {
              stop: config.stopSequences,
            }) as {}),
          };

          try {
            const res = await fetch("https://api.openai.com/v1/completions", {
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${props.apiKey}`,
              },
              body: JSON.stringify(requestConfig),
            });

            const data = await res.json();

            if (showInConsole) {
              console.log("Request config:", requestConfig);
              console.log("Response data:", data);
            }

            const selectedTextVariant = data.choices[0].text;

            parent.postMessage(
              {
                pluginMessage: {
                  type: "set-textnode",
                  textObject: {
                    id: textObject.id,
                    text: selectedTextVariant,
                  },
                },
              },
              "*"
            );
          } catch (error) {
            console.log("Error generating prompts", error);
            return false;
          }
        });
      }
    };
  }, [config, showInConsole]);

  return (
    <Layout gap="null">
      <Layout gap="medium">
        <HeaderWrap setView={props.setView}>
          <HeaderBack
            onClick={() => {
              props.setView("text");
            }}
            label="Compose"
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
            id="prompt"
            label="Prompt"
            placeholder="Turn text into a haiku: ${text}"
            helperText="Use ${text} string to insert layer text in prompt."
            helperTextPosition="top"
            value={config.prompt}
            errorMessage={promptError}
            onChange={(e) => {
              setPromptError("");
              handleChangeConfig("prompt", e.target.value);
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
              handleChangeConfig("stopSequences", e.target.value.split(","))
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
            id="maximumTokens"
            label="Maximum Tokens"
            min={1}
            max={4000}
            step={1}
            value={config.maximumTokens}
            onChange={(value: number) =>
              handleChangeConfig("maximumTokens", value)
            }
          />
          <RangeInput
            id="n"
            label="N (number of variants)"
            min={1}
            max={10}
            step={1}
            value={config.n}
            onChange={(value: number) => handleChangeConfig("n", value)}
          />
          <RangeInput
            id="variantToUse"
            label="Variant to use"
            helperText="Select the variant to use from the generated variants"
            min={1}
            max={10}
            step={1}
            value={config.variantToUse}
            onChange={(value: number) => handleChangeConfig("n", value - 1)}
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
          <RangeInput
            id="frequencyPenalty"
            label="Frequency Penalty"
            min={0}
            max={2}
            step={0.01}
            value={config.frequencyPenalty}
            onChange={(value: number) =>
              handleChangeConfig("frequencyPenalty", value)
            }
          />
          <RangeInput
            id="presencePenalty"
            label="Presence Penalty"
            min={0}
            max={2}
            step={0.01}
            value={config.presencePenalty}
            onChange={(value: number) =>
              handleChangeConfig("presencePenalty", value)
            }
          />
          <Button onClick={handleSanboxRequest} label="Generate" />
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
