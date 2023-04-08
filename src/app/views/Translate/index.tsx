import React from "react";
import { Input, Button, Layout } from "../../components";

interface Props {
  apiKey: string;
  setView: (view: viewsType) => void;
}

function removeLeadingNewLines(str) {
  return str.replace(/^\n+/, "");
}

export const requestToTranslate = async (apiKey, text, language) => {
  const prompt = `Translate text into ${language}: \`${text}\`. Return only the translation with the same format as the original text.`;

  try {
    const res = await fetch(`https://api.openai.com/v1/completions`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 70,
        temperature: 0,
      }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error generating prompts", error);
    return false;
  }
};

// Add parent class for sub-components
export const Translate: React.FC<Props> = (props) => {
  const [apiKey, setApiKey] = React.useState(props.apiKey);
  const [language, setLanguage] = React.useState("german");

  const handleTranslation = async () => {
    parent.postMessage({ pluginMessage: { type: "get-textnodes" } }, "*");
    console.log("apiKey", apiKey);
  };

  React.useEffect(() => {
    window.onmessage = async (event) => {
      const msg = event.data.pluginMessage;

      if (msg.type === "get-textnodes") {
        const textObjects = msg.textObjects;

        console.log("textObjects", textObjects);

        textObjects.forEach(async (textObject) => {
          await requestToTranslate(apiKey, textObject.text, language).then(
            (response) => {
              console.log("response", response);
              const translatedTextNode = removeLeadingNewLines(
                response.choices[0].text
              );

              console.log("translatedTextNode", translatedTextNode);

              parent.postMessage(
                {
                  pluginMessage: {
                    type: "set-textnode",
                    textObject: {
                      id: textObject.id,
                      text: translatedTextNode,
                    },
                  },
                },
                "*"
              );
            }
          );
        });
      }
    };
  }, [language]);

  React.useEffect(() => {
    setApiKey(props.apiKey);
  }, [props.apiKey]);

  return (
    <Layout gap="medium" divider>
      <Layout gap="small">
        <Input
          type="text"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
        <Button onClick={handleTranslation} label="Translate selected" />
      </Layout>
    </Layout>
  );
};
