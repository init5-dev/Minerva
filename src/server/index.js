import express, { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send('Hello')
})

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)


app.listen(3000, () => {
  console.log('Server on port', 3000)
})