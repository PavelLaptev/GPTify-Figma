export const prompt = (format: string) =>
  `
Convert currency in the sentence into ${format} format using the latest exchange rates. If the sentence contains multiple currencies, convert all of them.
Return the converted sentence after => sign, don't add any additional text. If the sentence doesn't contain any currency, return the original sentence.

If currecy name written in abbreviation, convert it to abbreviation (e.g. "USD" => "EUR").
If currency name written in full, convert it to full name (e.g. "United States Dollars" => "Indian Rupees").
If currency name written in as a symbol, convert it to symbol (e.g. "$" => "¥").

\${text}\ =>
`;
