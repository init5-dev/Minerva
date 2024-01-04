import { config } from "dotenv"
import { MongoClient } from "mongodb"

config()

const client = new MongoClient(process.env.MONGODB_URI)

const connect = async () => {
  //console.clear()
  process.stdout.write('Connecting to database... ')

  let database

  try {
    await client.connect()

    database = client.db('test')

    console.log('Done!')
  } catch (error) {
    console.log('\nERROR:', error.message)
    return null
  }

  return database
}

const database = await connect()
export { client, database }