export const prompt = (language: string, text: string) =>
  `Translate to ${language}:\`${text}\`

  ### Instructions
  1. Return only the translation with the same format as the original text.
  3. Return translation withouth any quotes (\`"\`) or backslashes (\`\\\`) if they are not part of the original text.
  `;
