export const prompt = (format: string) =>
  `
Convert currency in the sentence into ${format} format using the latest exchange rates. If the sentence contains multiple currencies, convert all of them.
Return the converted sentence after => sign, don't add any additional text. If the sentence doesn't contain any currency, return the original sentence.
If currecy name written in abbreviation, convert it to abbreviation (e.g. "USD" => "EUR").
If currency name written in full, convert it to full name (e.g. "United States Dollars" => "Indian Rupees").
If currency name written in as a symbol, convert it to symbol (e.g. "$" => "¥").

My monthly rent is ¥100,000 => My monthly rent is $721,92
During my vacation, I exchanged £500 => During my vacation, I exchanged $621,80
She earned 10,000 Indian Rupees => She earned 120,73 United States Dollars
I bought a new laptop for 1,500 EUR => I bought a new laptop for 1.621,88 USD
The price of the concert ticket was 50,000£ => The price of the concert ticket was 43.87$
He saved up 5,000 R$ for the trip => He saved up 930.48$ for the trip
The cost of the car repair was 20,000 Russian Rubles => The cost of the car repair was 278.26 United States Dollars
They sold their antique furniture for 2,000 Canadian Dollars => They sold their antique furniture for 1,624.24 United States Dollars
The monthly salary for the position is ¥300,000 => The monthly salary for the position is $2,165.76
I exchanged $1,000 for my vacation in Italy => I exchanged $1,000 for my vacation in Italy
The price of the new smartphone is 20,000 INR => The price of the new smartphone is 267.51 USD
She earned 50,000 MXN from her freelance work => She earned 2,620.80 USD from her freelance work
The cost of the hotel room was 150 British Pounds => The cost of the hotel room was 195.63 United States Dollars
\${text}\ =>
`;
