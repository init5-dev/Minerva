import nlp from "compromise/three"

const text = 'Hola, me llamo Nelson Ochagavía y mi esposa es Elisa Vega Martinez. Mi padre se llama Adolfo y mi madre Maritza. Tengo 32 años de edad, y 1500 dólares en mi cuenta bancaria.'

const encodeAge = (text, maxError = 5) => {
  const doc = nlp(text)
  const numbers = doc.numbers().text().split(' ').map(number => Number(number))
  const ages = numbers.filter(number => Number.isInteger(number) && number >= 0 && number <= 120)

  let dict = ages.map(age => {
    let eAge = age
    const seed = Math.random()
    const deviation = Math.ceil(Math.random() * (age >= maxError ? maxError : (age - maxError)))

    if (seed >= 0.5) {
      eAge += deviation
    } else {
      eAge -= deviation
    }

    return {
      age,
      eAge
    }
  })

  let eText = text

  dict.forEach(pair => {
    eText = eText.replace(pair.age, pair.eAge)
  })

  return {eText, dict}
}

const decodeAges = (eText, dict) => {
  let text = eText

  dict.forEach(pair => {
    text = text.replace(pair.eAge, pair.age)
  })

  return text
}

const {eText, dict} = encodeAge(text)
const decodedText = decodeAges(eText, dict)
console.log(eText)
console.log(dict)
console.log(decodedText)