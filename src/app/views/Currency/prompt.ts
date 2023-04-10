export const prompt = (format: string, text: string) =>
  `Convert all the dates in the given sentence to the format "${format}" and return the updated sentence with the converted dates. If there is no dates — don't do nothing. The input sentence is: \`${text}\``;
