export interface TargetAndHours {
  target: number
  hours: Array<number>
}

export interface exerciseCalculatorResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const parseArgument = (args: Array<string>): TargetAndHours => {
  if (args.length < 5) throw new Error('Not enough arguments')

  const argsAsNumbers = args.slice(2).map((arg) => {
    if (isNaN(Number(arg))) {
      throw new Error('All arguments must be numbers')
    }
    return Number(arg)
  })

  return { target: argsAsNumbers[0], hours: argsAsNumbers.slice(1) }
}

export const exerciseCalculator = (
  target: number,
  hours: Array<number>
): exerciseCalculatorResult => {
  const periodLength = hours.length
  const trainingDays = hours.filter((h) => h > 0).length
  const totalHours = hours.reduce((a, b) => a + b, 0)
  const average = totalHours / periodLength
  const success = average >= target
  const rating = success ? 3 : average >= target * 0.75 ? 2 : 1
  const ratingDescription =
    rating === 3
      ? 'excellent'
      : rating === 2
      ? 'not too bad but could be better'
      : 'bad'
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

try {
  const { target, hours }: TargetAndHours = parseArgument(process.argv)
  exerciseCalculator(target, hours)
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message
  }
  console.log(errorMessage)
}

//console.log(exerciseCalculator(2, [3, 0, 2, 4.5, 0, 3, 1]))
