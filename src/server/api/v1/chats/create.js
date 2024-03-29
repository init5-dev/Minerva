import { config } from "dotenv"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { database } from "../../../database/connect.js"

config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const createChat = async (req, res) => {
  try {
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
      status: 201,
      message: 'Chat created successfully.',
      chatId: result.insertedId
    })

  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message
    })
  }
}

export default createChat