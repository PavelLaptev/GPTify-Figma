export const prompt = (format: string, text: string) =>
  `Find in the string  \`${text}\` money amounts. If you find any, convert them into the following format: \`${format}\`. Return the updated string as the \`<gpt-output>\` tag. If there are no money amounts in the string, return the original string.`;
