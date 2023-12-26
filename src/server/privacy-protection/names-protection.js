import nlp from "compromise/three"
import gender from "gender-detection"
import { femaleNames, maleNames } from './data/names.js'
import ES from "./spanish.js"

const text = 'Hola, me llamo Nelson Ochagavía y mi esposa es Elisa Vega Martinez. Mi padre se llama Adolfo y mi madre Maritza'

const encryptValue = (value, array) => {
  let index

  do {
    index = Math.floor(Math.random() * array.length)
  } while (value === array[index])

  return {
    value,
    eValue: array[index]
  }
}

const decryptValue = (eValue, dict) => {
  const results = dict.filter(pair => pair.eValue === eValue)
  if (results.length) {
    return results[0].value
  } else {
    return null
  }
}

const encryptNames = (text) => {
  const doc = nlp(text)
  const names = doc.people().normalize().text().split(' ')

  let dict = names.map(name => {

    if (ES.isNoun(name)) {
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

const decryptNames = (eText, dict) => {
  const doc = nlp(eText)
  const eNames = doc.people().normalize().text().split(' ')
  const names = eNames.map(eName => decryptValue(eName, dict))

  let text = eText

  dict.forEach(pair => {
    text = text.replace(pair.eValue, pair.value)
  })

  return text
}

const {eText, dict} = encryptNames(text)
const names = decryptNames(eText, dict)

console.log(eText)
console.log(dict)
console.log(names)
