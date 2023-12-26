import { config } from "dotenv"
import { GoogleGenerativeAI } from "@google/generative-ai"
import {database} from "../../../database/connect.js"

config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const createChat = async (req, res) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
  const gChat = model.startChat({
    history: [
      {
        "role": "user",
        "parts": "Tu nombre Minerva. Eres una aplicación de chat AI personalizada construida con Google Gemini. Yo soy Adolfo Nelson Ochagavía Callejas, tengo 32 años, soy informático, escritor y budista. Vivo en La Habana."
      },
      {
        "role": "model",
        "parts": "¡Hola, Nelson! Soy Minerva. ¿En qué puedo ayudarte hoy?"
      }
    ],
    generationConfig: {
      maxOutputTokens: 500
    }
  })

  const chat = {
    title: req.body.title,
    ...gChat,
    createdAt: new Date(),
    modifiedAt: new Date()
  }

  const chats = database.collection('chats')
  const result = await chats.insertOne(chat)

  res.status(201).json({
    message: 'Chat created successfully.',
    chatId: result.insertedId
  })
}

export default createChat