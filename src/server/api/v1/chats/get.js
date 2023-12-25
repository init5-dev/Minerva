import { BSON } from "mongodb"
import { database } from "../../../database/connect.js"

const getChat = async (req, res) {
  const _id = BSON.ObjectId(req.params.id)
  const chat = await database.collections('chats').findOne({_id})

  res.status(200).json(chat)
}

export default getChat