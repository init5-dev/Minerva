import { config } from "dotenv"
import { GoogleGenerativeAI } from "@google/generative-ai"
import {database} from "../../../database/connect.js"

config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const createChat = async (req, res) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const chat = {
    title: req.body.title,
    value: model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 500
      }
    }),
    createdAt: new Date(),
    modifiedAt: new Date()
  }

  const chats = database.collection('chats')
  await chats.insertOne(chat)

  res.status(201).send('Chat created successfully.')
}

export default createChat