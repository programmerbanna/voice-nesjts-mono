const locationMappings: { [key: string]: string } = {
  uttara: 'Uttara',
  dhaka: 'Dhaka',
}

const stopWords = ['find', 'me', 'a', 'the', 'in', 'at', 'of', 'and', 'or']

export const normalizeQuery = (input: string): string[] => {
  const lowercaseInput = input.toLowerCase()

  let normalizedInput = lowercaseInput
    .replace(/\bdoc\b/gi, 'doctor')
    .replace(/\bhosp\b/gi, 'hospital')

  const words = normalizedInput.split(' ')

  const keywords = words
    .filter((word) => !stopWords.includes(word))
    .map((word) => locationMappings[word] || word)

  console.log('Normalized keywords:', keywords)
  return keywords
}
