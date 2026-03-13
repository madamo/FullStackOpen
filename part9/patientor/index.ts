import express from 'express';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

//TO-DO: CLONE FRONT-END
// fork front end code from repo
// still trying to fork front end code

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});