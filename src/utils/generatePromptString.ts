export const generatePromptString = (text: string, prompt: string) => {
  // if prompt contains ${text} replace it with the text
  return prompt.replace("${text}", text);
};
