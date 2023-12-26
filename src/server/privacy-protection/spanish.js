import nlp from 'es-compromise'

const ES = {}

ES.isNoun = (word) => {
  const doc = nlp(word)
  const nouns = doc.nouns().text()
  return Boolean(nouns.length)
}

export default ES