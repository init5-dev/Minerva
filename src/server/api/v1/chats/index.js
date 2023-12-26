import { database } from "../../../database/connect.js"

const getChats = async (req, res) => {
  const chats = database.collection('chats')
  const data = await chats.find({}).project({ title: 1 }).toArray()

  res.status(200).json(data)
}

export default getChats