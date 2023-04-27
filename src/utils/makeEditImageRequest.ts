interface MakeEditRequestProps {
  secret: string;
  prompt: string;
  image: string;
  mask: string;
  size: string;
  setErrorMessage: (message: string) => void;
}

export const makeEditImageRequest = async (prop: MakeEditRequestProps) => {
  console.log("makeEditImageRequest", prop);

  try {
    const response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${prop.secret}`,
      },
      body: JSON.stringify({
        prompt: prop.prompt,
        image: prop.image,
        mask: prop.mask,
        size: `${prop.size}x${prop.size}`,
        n: 1,
        response_format: "b64_json",
      }),
    });

    const responeData = await response.json();

    console.log("responeData", responeData);
    // const image = responeData.data[0].b64_json;

    // return image;
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
};
