interface bmiValues {
  height: number;
  weight: number;
}

//TO-DO: add ESLint

const parseArguments = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers');
  }
}

export const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / ((height / 100) * (height/100));
  if (bmi < 18.5) {
    return 'Underweight';
    //console.log("Underweight");
  } else if (bmi > 18.5 && bmi < 25) {
    return 'Normal range';
    //console.log("Normal range");
  } else if (bmi > 25 && bmi < 30) {
    return 'Overweight';
    //console.log("Overweight");
  } else {
    //console.log("Obese");
    return 'Obese';
  }
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

//export default calculateBmi;