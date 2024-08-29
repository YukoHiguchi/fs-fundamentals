interface argValues {
  height: number
  weight: number
}
export const parseArguments = (args: Array<string>): argValues => {
  console.log(args)
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}
export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height * height * 0.0001)
  switch (true) {
    case bmi < 18.5:
      return 'Underweight'
    case bmi < 25:
      return 'Normal range'
    case bmi < 30:
      return 'Overweight'
    default:
      return 'Obese'
  }
}

if (require.main === module) {
  try {
    const { height, weight }: argValues = parseArguments(process.argv)
    console.log(calculateBmi(height, weight))
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) {
      errorMessage += error.message
    }
    console.log(errorMessage)
  }
}
