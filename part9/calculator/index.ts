import express from 'express'
import { calculator, Operation } from './calculator'
const app = express()
app.use(express.json())

app.get('/ping', (_req, res) => {
  console.log('someone pinged here', _req.body)
  res.send('pong')
})

app.post('/calculator', (req, res) => {
  const { value1, value2, op } = req.body
  console.log('body', req, value1, value2, op)
  // validate the data here
  if (!value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: '...' })
  }
  const result = calculator(Number(value1), Number(value2), op as Operation)
  return res.send({ result })
})
const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
