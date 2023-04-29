interface MakeEditRequestProps {
  secret: string;
  prompt: string;
  size: string;
  setErrorMessage: (message: string) => void;
}

export const makeCreateImageRequest = async (prop: MakeEditRequestProps) => {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${prop.secret}`,
        },
        body: JSON.stringify({
          model: "image-alpha-001",
          prompt: prop.prompt,
          size: `${prop.size}x${prop.size}`,
          n: 1,
          response_format: "b64_json",
        }),
      }
    );

    const responeData = await response.json();

    const image = responeData.data[0].b64_json;

    return image;
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
};
