import { BSON } from "mongodb"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { database } from "../../../database/connect.js"

const getUserById = async (req, res) => {
  const _id = new BSON.ObjectId(req.params.id)

  try {
    const user = await database.collection('users').findOne({ _id })

    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).send('User not found')
    }
  } catch (error) {
    res.send(error.message)
  }
}

const getUserByCredentials = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(401).json({
      message: 'Incomplete credentials',
    })
  } else {
    let user = await database.collection('users').findOne({ email })

    if (user) {
      console.log(password, typeof password)
      console.log(user.password, typeof password)
      const passwordMatch = await bcrypt.compare(password, user.password)
      if (passwordMatch) {

        user = await database.collection('users').findOneAndUpdate({ _id: user._id }, {
          $set: {
            loggedAt: new Date()
          }
        })

        const secret = process.env.JWT_SECRET
        console.log('SECRET:', secret)
        const token = jwt.sign({ userId: user._id }, secret, {
          expiresIn: '1h'
        })

        res.status(200).json({
          message: 'Logged!',
          user
        })
      } else {
        res.status(401).json({
          message: 'Invalid credentials',
        })
      }
    } else {
      res.status(401).json({
        message: 'Invalid credentials',
      })
    }
  }
}

export { getUserById, getUserByCredentials }