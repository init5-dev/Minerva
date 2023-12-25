import { BSON, ObjectId } from "mongodb"
import { database } from "../../../database/connect.js"

const updateChat = async (req, res) => {
  const chatId = new BSON.ObjectId(req.body.chatId)
  const content = req.body.content

  const chat = await database.collection('chats').findOne({ _id: chatId })
  console.log(chatId)
  console.dir(content)

  const response = await database.collection('chats').updateOne({ _id: chatId }, {
     $set: {
      ...content
     }
   })

  res.status(201).send(response)
}

export default updateChat