import { BSON } from "mongodb"
import { database } from "../../../database/connect.js"

const updateChat = async (req, res) => {
  const chatId = new BSON.ObjectId(req.body.id)
  const values = req.body.values

  const chat = await database.collection('chats').findOne({ _id: chatId })
  console.dir(chat)

  const updatedChat = await database.collection('chats').updateOne({ _id: chatId }, {
    $set: values
  })

  console.log(values)

  res.status(201).send(updatedChat)
}

export default updateChat