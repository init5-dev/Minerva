import { BSON } from "mongodb"
import { database } from "../../../database/connect.js"


const getChat = async (req, res) => {
  const id = new BSON.ObjectId(req.params.id)

  try {
    const chats = database.collection('chats')
    const chat = await chats.findOne({ _id: id })
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).send(error)
  }
}

export default getChat