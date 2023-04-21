interface MakeEditRequestProps {
  secret: string;
  setErrorMessage: (message: string) => void;
  model?: string;
  input: string;
  instruction: string;
  temperature?: number;
  stopSequences?: string[];
}

export const makeEditRequest = async (prop: MakeEditRequestProps) => {
  const stopSequences = prop.stopSequences || [];

  try {
    const response = await fetch("https://api.openai.com/v1/edits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${prop.secret}`,
      },
      body: JSON.stringify({
        model: prop.model || "text-davinci-edit-001",
        input: prop.input,
        instruction: prop.instruction,
        temperature: prop.temperature || 0.5,
        ...((stopSequences.length > 0 && {
          stop: stopSequences,
        }) as {}),
      }),
    });

    const data = await response.json();

    if (data.choices && data?.choices[0]?.text) {
      return data.choices[0].text;
    }

    throw new Error(data.error.message);
  } catch (error) {
    console.error("Request failed:", error);
    prop.setErrorMessage(error.message);
    throw error;
  }
};
