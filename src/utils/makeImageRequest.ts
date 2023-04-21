interface MakeEditRequestProps {
  secret: string;
  prompt: string;
  size: string;
}

export const makeImageRequest = async (prop: MakeEditRequestProps) => {
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
          num_images: 1,
          response_format: "b64_json",
        }),
      }
    );

    const responeData = await response.json();

    const image = responeData.data[0].b64_json;

    console.log(image);

    // const data = await response.json();

    // if (data.choices && data?.choices[0]?.text) {
    //   return data.choices[0].text;
    // }

    // throw new Error(data.error.message);
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
};
