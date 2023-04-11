export function getTextFromGptOutputTag(str) {
  const regex = /<gpt-output>(.*?)<\/gpt-output>/;
  const match = str.match(regex);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}
