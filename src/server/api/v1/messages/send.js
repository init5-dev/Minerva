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

  let response = await axios.get(`http://${host}:${port}/api/v1/chats/${chatId}`)
  const data = await response.data
  const {_id, title, createdAt, modifiedAt, ...chat} = data

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
  response = await result.response

  //Update chat in database

  response = await database.collection('chats').updateOne({ _id: new BSON.ObjectId(chatId) }, {
    $set: {
      _history: gChat._history,
      modifiedAt: new Date()
    }
  })

 res.status(201).send(response)
}

export default sendMessage