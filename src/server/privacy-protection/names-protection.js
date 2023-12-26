import nlp from "compromise/three"
import gender from "gender-detection"
import { femaleNames, maleNames } from './data/names.js'
import ES from "./spanish.js"
import { encryptValue } from "./encryption.js"

const text = 'Hola, me llamo Nelson Ochagavía y mi esposa es Elisa Vega Martinez. Mi padre se llama Adolfo y mi madre Maritza'

const encodeNames = (text) => {
  const doc = nlp(text)
  const names = doc.people().normalize().text().split(' ')

  let dict = names.map(name => {

    if (ES.isNoun(name)) { // This is for avoiding some mistakes because compromise doesn't understand Spanish. For example: it recognizes "y" as a people.
      const g = gender.detect(name)
      const fakeList = g === 'male' ? maleNames : femaleNames

      return encryptValue(name, fakeList)
    }
  })

  dict = dict.filter(pair => pair && pair)

  let eText = text

  dict.forEach(pair => {
    eText = eText.replace(pair.value, pair.eValue)
  })

  return { eText, dict }
}

const decodeNames = (eText, dict) => {
  let text = eText

  dict.forEach(pair => {
    text = text.replace(pair.eValue, pair.value)
  })

  return text
}

const {eText, dict} = encodeNames(text)
const decodedText = decodeNames(eText, dict)

console.log('Text with names encoded:', eText)
console.log('Encoding dictionary:', dict)
console.log('Decoded encoded text:', decodedText)

export {encodeNames, decodeNames}
