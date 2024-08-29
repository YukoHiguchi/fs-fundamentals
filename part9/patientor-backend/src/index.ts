import express from 'express';
import patientsRouter from './routes/patients';
import cors from 'cors';
const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});
app.use('/api/patients', patientsRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
