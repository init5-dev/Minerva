import { config } from "dotenv"
import { GoogleGenerativeAI } from "@google/generative-ai"
import nlp from "compromise/three"
import { model } from "mongoose"

const text = 'Hola, me llamo Nelson Ochagavía y mi esposa es Elisa Vega Martinez. Mi padre se llama Adolfo y mi madre Maritza. Tengo 32 años de edad, y 1500 dólares en mi cuenta bancaria, y me puedes llamar al 78612250. El télefono de Fulano es +1-737-34-56-23-11'

/**
  STEPS:

  1. Encode all numbers.
  2. Use Gemini to recognize a phone number
  3. Encode that phone number.
*/

config()

const encodeNumber = (number, maxError = 5) => {
  let eNumber = number
  const seed = Math.random()
  const deviation = Math.ceil(Math.random() * (number >= maxError ? maxError : (number + maxError > 9) ? (9 - maxError - number) : (number - maxError)))

  if (seed >= 0.5) {
    eNumber += deviation
  } else {
    eNumber -= deviation
  }

  return {
    number,
    eNumber
  }
}

const getPhoneNumbers = async (text) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

  const generationConfig = {
    maxOutputTokens: 200,
    temperature: 0.1,
    topP: 0.1,
    topK: 1,
  }


  const model = genAI.getGenerativeModel({ model: 'gemini-pro' }, generationConfig)

  const prompt = `
   Encuentra todos los números de teléfono en el texto que te voy a proporcionar. Devuelve un texto plano con un array de strings si encontraste al menos un número de teléfono, o un texto plano con un array vacío si no encontraste ninguno.

    Text: "${text}"
  `.trim()

  const result = await model.generateContent(prompt)
  const response = await result.response
  const phoneNumbers = response.text().replace("'", '"')

  try {
    const list = JSON.parse(phoneNumbers)
    return list
  } catch (error) {
    console.log(error)
    return []
  }
}

const encodePhoneNumbers = (text, maxError = 5) => {
  const doc = nlp(text)
  const numbers = doc.numbers().text().split(' ').map(number => Number(number))

  let dict = numbers.map(number => encodeNumber(number))

  let eText = text

  dict.forEach(pair => {
    eText = eText.replace(pair.age, pair.eAge)
  })

  return { eText, dict }
}

const decodeAges = (eText, dict) => {
  let text = eText

  dict.forEach(pair => {
    text = text.replace(pair.eAge, pair.age)
  })

  return text
}

// const { eText, dict } = encodePhoneNumber(text)
// const decodedText = decodeAges(eText, dict)
// console.log(eText)
// console.log(dict)
// console.log(decodedText)

const phoneNumbers = await getPhoneNumbers(text)
console.log(phoneNumbers)