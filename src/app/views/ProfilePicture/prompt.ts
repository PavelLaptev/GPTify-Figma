export const prompt = (
  ethnicGroups: string,
  sex: string,
  age: number,
  hairColor: string
) =>
  `a photo of ${ethnicGroups} ${sex !== "any" ? sex : "person"} at the ${age} years old ${hairColor !== "any" ? `with ${hairColor} hair` : ""}`;
