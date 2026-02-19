import express from 'express';

import bmiCalculator from './bmiCalculator.ts';


const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});