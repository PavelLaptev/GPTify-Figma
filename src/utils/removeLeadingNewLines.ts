export function removeLeadingNewLines(str) {
  return str.replace(/^\n+|\n+$/g, "");
}
