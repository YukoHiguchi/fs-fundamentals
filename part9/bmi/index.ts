import express from 'express'
import { calculateBmi } from './bmiCalculator'
import {
  exerciseCalculator,
  exerciseCalculatorResult,
} from './exerciseCalculator'
const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  try {
    if (!req.query.height || !req.query.weight)
      throw new Error('malformatted parameters')

    const height = Number(req.query.height)
    const weight = Number(req.query.weight)
    const bmi = calculateBmi(height, weight)
    res.send({ weight, height, bmi })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    const errorMessage = 'malformatted parameters'
    res.status(404).send({ error: errorMessage })
  }
})

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body
  console.log(target, daily_exercises)
  if (!daily_exercises || !target) {
    return res.status(400).send({ error: 'parameters missing' })
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  if (isNaN(Number(target)) || daily_exercises.some(isNaN)) {
    return res.status(400).send({ error: 'malformatted parameters' })
  } else {
    const result: exerciseCalculatorResult = exerciseCalculator(
      Number(target),
      daily_exercises as Array<number>
    )
    return res.send(result)
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
