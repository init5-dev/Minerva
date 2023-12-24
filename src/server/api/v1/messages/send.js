import { config } from "dotenv"
import axios from "axios"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { database } from "../../../database/connect.js"

config()

const sendMessage = async (req, res) => {
  const chatId = req.body.chatId
  const message = req.body.message

  const host = process.env.EXPRESS_HOST
  const port = process.env.EXPRESS_PORT

  let response = await axios.get(`http://${host}:${port}/api/v1/chats/${chatId}`)
  const data = await response.data

  // Create new chat using Gemini

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
  const chatParams = data.value.params
  const chat = model.startChat(chatParams)

  // Send message and await for response

  const result = await chat.sendMessage(message)
  response = await result.response
  const text = response.text()

  // Update chat in database
  // response = await axios.put(`http://${host}:${port}/api/v1/chats/`, {
  //   title: req.body.title,
  //   value: ,
  //   createdAt: new Date(),
  //   modifiedAt: new Date()
  // })

  res.status(201).json(text)
}

export default sendMessage