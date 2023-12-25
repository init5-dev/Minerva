import { config } from "dotenv"
import { GoogleGenerativeAI } from "@google/generative-ai"
import {database} from "../../../database/connect.js"

config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const createChat = async (req, res) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
  const gChat = model.startChat({
    history: [],
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
  await chats.insertOne(chat)

  res.status(201).send('Chat created successfully.')
}

export default createChat