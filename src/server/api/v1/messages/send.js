import { config } from "dotenv"
import axios from "axios"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { database } from "../../../database/connect.js"
import { BSON } from "mongodb"

config()

const sendMessage = async (req, res) => {
  const chatId = req.body.chatId
  const message = req.body.message

  const host = process.env.EXPRESS_HOST
  const port = process.env.EXPRESS_PORT

  // Get chat history and generationConfig from database

  let response = await axios.get(`http://${host}:${port}/api/v1/chats/${chatId}`)
  const data = await response.data

  const { _id, title, createdAt, modifiedAt, ...chat } = data

  const history = chat._history
  const generationConfig = chat.params.generationConfig

  // Create new chat using Gemini

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const gChat = model.startChat({
    history,
    generationConfig
  })

  // Send message and await for response

  const result = await gChat.sendMessage(message)
  response = result.response

  if (gChat._history.length === 4) {   // Then generate title and update chat in database
    const generationConfig = {
      stopSequences: ["red"],
      maxOutputTokens: 200,
      temperature: 0.1,
      topP: 0.1,
      topK: 1,
    };

    const titleGenAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const titleModel = titleGenAi.getGenerativeModel({ model: 'gemini-pro' }, generationConfig)
    const instruction = `Sugiere un título para el chat que comienza con este mensaje del usuario: ${message}. Responde únicamente con el título. 
    
    Por ejemplo:
      - Mensaje: ¿Qué son las pirámides de egipto?
      - Tu respuesta: 'Pirámides de egipto'
    `

    const titleResult = await titleModel.generateContent(instruction)
    const titleResponse = titleResult.response
    const title = titleResponse.text()

    await database.collection('chats').updateOne({ _id: new BSON.ObjectId(chatId) }, {
      $set: {
        title
      }
    })
  }

  //Update chat messages in database

  response = await database.collection('chats').updateOne({ _id: new BSON.ObjectId(chatId) }, {
    $set: {
      _history: gChat._history,
      modifiedAt: new Date()
    }
  })

  res.status(201).send(response)
}

export default sendMessage