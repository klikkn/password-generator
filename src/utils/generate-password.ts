export function generatePassword(words: string[] = [], length: number = 0): string {
  const wordsLength = words.length;

  let password = '';
  while (password.length < length) {
    const randomIndex = Math.floor(Math.random() * wordsLength);
    password += ' ';
    password += words[randomIndex];
  }

  return password.trim();
}