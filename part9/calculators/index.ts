import express from 'express';

import bmiCalculator from './bmiCalculator.ts';
import calculator from './exerciseCalculator.ts';


const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack Baby!');
});

app.get('/bmi', (req, res) => {

  if (!req.query.height || !req.query.weight) {
    res.send({ error: 'malformatted parameters'} )
  }

  const height:number = parseInt(req.query.height as string);
  const weight:number = parseInt(req.query.weight as string);

  const bmi = bmiCalculator(height, weight)


  res.send({ 
    height: height,
    weight: weight,
    bmi: bmi
    });
})

app.post('/exercises', (req, res) => {
  const exercise = req.body;
  console.log(exercise)
  let error: string = ""
  
  if (!exercise.target || !exercise.daily_exercises) {
    error = "parameters missing"
  }

  exercise.daily_exercises.map((el: number) => {
    if (typeof el !== 'number') {
      console.log('bad params')
      error = "malformatted parameters"
    }
  })

  if (error) {
    return res.status(400).send({
      error: error
    })
  } else {
    const result = calculator(exercise.target, exercise.daily_exercises)
    return res.send(result)
  }

})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});