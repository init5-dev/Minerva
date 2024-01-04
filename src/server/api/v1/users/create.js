import { database } from "../../../database/connect.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.send('Incomplete credentials')
  } else {
    const users = database.collection('users')

    try {
      const user = await users.findOne({ email })

      if (user) {
        res.send('User already exists!')
      } else {
        const response = await users.insertOne({
          email,
          password: await bcrypt.hash(password, 10)
        })
        res.status(201).json(response)
      }
    } catch (error) {
      res.send(error.message)
    }
  }
}

export default createUser