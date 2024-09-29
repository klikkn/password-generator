export function generatePassword(words: string[], wordLimit: number): string {
  const wordsLength = words.length;
  const selectedWords: string[] = [];

  for (let i = 0; i < wordLimit; i++) {
    const randomIndex = Math.floor(Math.random() * wordsLength);
    selectedWords.push(words[randomIndex]);
  }

  return selectedWords.join('');
}
