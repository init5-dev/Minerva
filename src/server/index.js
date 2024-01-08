import express, { Router } from 'express'
import cors from "cors"
import createChat from "./api/v1/chats/create.js"
import getChat from "./api/v1/messages/get.js"
import sendMessage from "./api/v1/messages/send.js"
import updateChat from "./api/v1/chats/update.js"
import getChats from "./api/v1/chats/index.js"
import createUser from "./api/v1/users/create.js"
import { getUserById, getUserByCredentials } from "./api/v1/users/get.js"
import { verifyToken } from "./middlewares.js"

const app = express()

// ROUTES

const router = Router()

router.all(verifyToken, (req, res) => {
  res.status(200).json({ message: 'Protected route accessed' });
  })

router.get('/api/v1/chats/', getChats)
router.get('/api/v1/chats/:id', getChat)
router.post('/api/v1/chats/', createChat)
router.put('/api/v1/chats/', updateChat)

router.post('/api/v1/messages/send', sendMessage)

router.post('/api/v1/users/login', getUserByCredentials)
router.get('/api/v1/users/:id', getUserById)
router.post('/api/v1/users', createUser)


// MIDDLEWARES

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(router)


app.listen(3000, () => {
  console.log('Server on port', 3000)
})