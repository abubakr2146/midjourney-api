import express, { Request, Response } from 'express';
import { imagineScenario } from './imagine-ws';

const app = express();
const port = 3000;

app.get('/imagine', (req: Request, res: Response) => {
  const prompt = req.query.prompt as string;

  if (!prompt) {
    res.status(400).send('Missing prompt parameter');
    return;
  }

  imagineScenario(
    process.env.SERVER_ID as string,
    process.env.CHANNEL_ID as string,
    process.env.SALAI_TOKEN as string,
    process.env.HUGGINGFACE_TOKEN as string,
    prompt
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