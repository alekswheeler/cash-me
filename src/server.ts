import 'reflect-metadata'
import express from 'express'
import { router } from './routes'

const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
  return res.json({ message: 'Hello World' })
})

app.use(router)

app.listen(8080, () => {
  console.log('Server running on port 8080')
})
