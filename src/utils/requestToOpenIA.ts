export const requestToOpenIA = async (
  apiKey: string,
  prompt: string,
  textObjectId: string
) => {
  try {
    const res = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 150,
        temperature: 0,
      }),
    });

    const data = await res.json();
    const translatedTextNode = data.choices[0].text;

    console.log("translatedTextNode", translatedTextNode);

    parent.postMessage(
      {
        pluginMessage: {
          type: "set-textnode",
          textObjectType: {
            id: textObjectId,
            text: translatedTextNode,
          },
        },
      },
      "*"
    );
  } catch (error) {
    console.log("Error generating prompts", error);
    return false;
  }
};
