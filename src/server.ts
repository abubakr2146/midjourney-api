
import express, { Request, Response } from 'express';
import { imagineScenario } from './imagine';

const app = express();
const port = 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

console.log(process.env.SALAI_TOKEN)

app.post('/imagine', (req: Request, res: Response) => {
  const prompt = req.body.prompt;
 

  console.log('Received prompt:', prompt);
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
    .then((image_uri: string | undefined) => {
      if (!image_uri) {
        res.status(500).send('Image URI is undefined');
        return;
      }

      res.send({ uri: image_uri });
    })
    .catch((err: Error) => {
      console.error(err);
      res.status(500).send(err.message);
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});