import { database } from "../../../database/connect.js"

const getChats = async (req, res) => {
  try {
    const chats = database.collection('chats')
    const data = await chats.find({}).project({ title: 1 }).sort({modifiedAt: -1}).toArray()

    res.status(200).json(data)
  } catch (error) {
    res.status(500).send(error)
  }
}

export default getChats