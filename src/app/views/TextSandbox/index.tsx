import React from "react";
import {
  Input,
  TextArea,
  RangeInput,
  Button,
  Layout,
  HeaderWrap,
  HeaderBack,
  Divider,
} from "../../components";

interface Props {
  apiKey: string;
  setView: (view: viewsType) => void;
}

// Add parent class for sub-components
export const TextSandbox: React.FC<Props> = (props) => {
  const [config, setConfig] = React.useState({
    model: "text-davinci-003",
    prompt: "Make this text funny: ${text}",
    temperature: 0,
    topP: 1,
    frequencyPenalty: 1,
    presencePenalty: 1,
    maximumTokens: 150,
    n: 1,
    variantToUse: 0,
  } as modelSettingsType);

  const handleChangeConfig = (key: string, value: string | number) => {
    setConfig({ ...config, [key]: value });
  };

  const handleSanboxRequest = async () => {
    parent.postMessage({ pluginMessage: { type: "get-textnodes" } }, "*");
  };

  const generatePromptString = (text: string, prompt: string) => {
    return prompt.replace("${text}", text);
  };

  React.useEffect(() => {
    window.onmessage = async (event) => {
      const msg = event.data.pluginMessage;

      if (msg.type === "get-textnodes") {
        const textObjects = msg.textObjects;

        textObjects.forEach(async (textObject) => {
          try {
            const res = await fetch("https://api.openai.com/v1/completions", {
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${props.apiKey}`,
              },
              body: JSON.stringify({
                model: config.model,
                prompt: generatePromptString(textObject.text, config.prompt),
                max_tokens: config.maximumTokens,
                temperature: config.temperature,
                top_p: config.topP,
                frequency_penalty: config.frequencyPenalty,
                presence_penalty: config.presencePenalty,
              }),
            });

            const data = await res.json();

            const selectedTextVariant = data.choices[0].text;

            parent.postMessage(
              {
                pluginMessage: {
                  type: "set-textnode",
                  textObjectType: {
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
  }, [config]);

  return (
    <Layout gap="null">
      <Layout gap="medium">
        <HeaderWrap setView={props.setView}>
          <HeaderBack
            onClick={() => {
              props.setView("text");
            }}
            label="Sandbox"
          />
        </HeaderWrap>
        <p className="caption">
          Welcome to the OpenAI API playground.
          <br />
          You can experiment with the API using the{" "}
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
          <Input label="Model" value={config.model} disabled />
          <TextArea
            label="Prompt"
            helperText="Use ${text} if you want ot modify the text"
            value={config.prompt}
            onChange={(e) => handleChangeConfig("prompt", e.target.value)}
          />
          <RangeInput
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
            label="N (number of variants)"
            min={1}
            max={10}
            step={1}
            value={config.n}
            onChange={(value: number) => handleChangeConfig("n", value)}
          />
          <RangeInput
            label="Variant to use"
            helperText="Select the variant to use from the generated variants"
            min={0}
            max={10}
            step={1}
            value={config.variantToUse}
            onChange={(value: number) => handleChangeConfig("n", value)}
          />
          <RangeInput
            label="Top P"
            min={0}
            max={1}
            step={0.01}
            value={config.topP}
            onChange={(value: number) => handleChangeConfig("topP", value)}
          />
          <RangeInput
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
      </Layout>
    </Layout>
  );
};
