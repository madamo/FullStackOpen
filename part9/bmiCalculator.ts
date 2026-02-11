/*
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

Major adult BMI classifications are underweight (under 18.5 kg/m2), normal weight (18.5 to 24.9), overweight (25 to 29.9), and obese (30 or more).[1] 
*/

const calculateBmi = (args: string[]) => {
  const weight = Number(args[3]);
  const height = Number(args[2]);
  const bmi = weight / ((height / 100) * (height/100));
  if (bmi < 18.5) {
    //return 'Underweight';
    console.log("Underweight");
  } else if (bmi > 18.5 && bmi < 25) {
    //return 'Normal range';
    console.log("Normal range");
  } else if (bmi > 25 && bmi < 30) {
    //return 'Overweight';
    console.log("Overweight");
  } else {
    console.log("Obese");
    //return 'Obese';
  }
}

calculateBmi(process.argv);