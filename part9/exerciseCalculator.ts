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

interface exerciseLog {
  target: number;
  hours: number[];
}

const checkArguments = (args: string[]): exerciseLog => {
  console.log(args);
  if (args.length < 4) throw new Error('Not enough arguments');
  const numberArray = args.slice(3).map(Number)
  return {
    target: Number(args[2]),
    hours: numberArray
  }
}

const calculator = (target: number, hours: number[]): Result => {
 
  console.log('target:', target);
  console.log('hours:', hours);

  let trainingDays = 0;
  let totalHours = 0;
  let rating = 0;
  let description = ""
  //const target = 2;

  hours.map(hour => {
    if (hour > 0) {
      trainingDays++
      totalHours+=hour
    } 
  })

  if (Math.round(totalHours / hours.length) > target) {
    rating = 3
  } else if (Math.round(totalHours / hours.length) === target) {
    rating = 2;
  } else {
    rating = 1;
  }

  switch (rating) {
    case 3:
      description += "Good job"
      break;
    case 2:
      description += "not bad but could be better"
      break;
    case 1:
      description += "Try harder"
      break;
  }

  return {
    periodLength: hours.length,
    trainingDays: trainingDays,
    success: totalHours / hours.length >= target ? true : false,
    rating: rating,
    ratingDescription: description,
    target: target,
    average: totalHours / hours.length
  }
}

try {
  const { target, hours } = checkArguments(process.argv);
  console.log(calculator(target, hours));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
