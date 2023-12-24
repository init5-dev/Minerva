import express, { Router } from 'express'
import createChat from "./api/v1/chats/create.js"
import getChat from "./api/v1/messages/get.js"
import sendMessage from "./api/v1/messages/send.js"
import updateChat from "./api/v1/chats/update.js"

const app = express()

// ROUTES

const router = Router()

router.get('/api/v1/chats/:id', getChat)
router.post('/api/v1/chats/', createChat)
router.put('/api/v1/chats/', updateChat)

router.post('/api/v1/messages/send', sendMessage)


// MIDDLEWARES

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)


app.listen(3000, () => {
  console.log('Server on port', 3000)
})