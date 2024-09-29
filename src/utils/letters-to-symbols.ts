export function replaceLettersWithSymbols(input: string, symbolsMap: { [key: string]: string }): string {
  return input.split('').map(char => {
    if (Math.random() > 0.5 && symbolsMap[char.toLowerCase()]) {
      return symbolsMap[char.toLowerCase()];
    }
    return char;
  }).join('');
}