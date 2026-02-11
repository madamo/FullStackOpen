/* 
type Operation = 'multiply' | 'add' | 'divide';

const calculator = (a: number, b: number, op: Operation): number => {
  switch(op) {
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) throw new Error('can\'t divid by 0!');
      return a / b;
    case 'add':
      return a + b;
    default:
      throw new Error('Operation is not multiply, add, or divide!')
  }
}

try {
  console.log(calculator(1, 5, 'divide'));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

interface MultiplyValues {
  value1: number;
  value2: number;
}

    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
*/

interface Result {
  periodLength: number;
  trainingDays: number;
  success: Boolean;
  rating: number;
  ratingDescription: String;
  target: number;
  average: number;
}

const calculator = (target: number, hours: number[]) => {
  // TO-DO: get arguments
  console.log(process.argv[2])
  console.log(process.argv[3])

  let trainingDays = 0;
  let totalHours = 0;
  //const target = 2;

  hours.map(hour => {
    if (hour > 0) {
      trainingDays++
      totalHours+=hour
    } 
  })
  console.log('total hours', totalHours)
  console.log('avg hours:', totalHours / hours.length )
  console.log('training days:', trainingDays)
  console.log('period length:', hours.length)
  console.log('success:', totalHours / hours.length >= target ? true : false)
  return {
    periodLength: hours.length,
    trainingDays: trainingDays,
    success: totalHours / hours.length >= target ? true : false,
    rating: 2,
    ratingDescription: 'not too bad but could be better',
    target: target,
    average: totalHours / hours.length
  }
}

calculator(2, [1,0,2,0,3])