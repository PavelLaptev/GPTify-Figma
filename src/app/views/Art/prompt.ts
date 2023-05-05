export const prompt = (artStyle: string, artSubject: string) =>
  `${artStyle !== "any" ? `a ${artStyle}` : "an"} ${
    artSubject !== "any" ? artSubject : "art"
  }`;
