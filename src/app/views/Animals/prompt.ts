export const prompt = (animal: string) =>
  `a photo of ${animal !== "any" ? `a ${animal}` : "an animal"}`;
