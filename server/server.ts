import express, { Request, Response } from 'express';
import { imagineScenario } from './imagine-ws';

const app = express();
const port = 3000;

app.get('/imagine', (req: Request, res: Response) => {
  imagineScenario(
    process.env.SERVER_ID as string,
    process.env.CHANNEL_ID as string,
    process.env.SALAI_TOKEN as string,
    process.env.HUGGINGFACE_TOKEN as string,
    "a cow riding a bus"
  )
    .then(() => {
      res.send("finished");
    })
    .catch((err: Error) => {
      console.error(err);
      res.status(500).send(err.message);
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});