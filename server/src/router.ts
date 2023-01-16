import { createRandomDoc } from "./docsCreator";
import { Express, Request, Response, NextFunction } from 'express';

export default function (app: Express) {
  app.get('/', (req, res, next) => {
    res.send(true);
  });

  app.get('/documents1', (req, res, next) => {
    const arr = Array(7).fill(undefined);
    const docs = arr.map((v, i) => createRandomDoc(i));
    res.send(docs);
  });

  app.get('/documents2', (req, res, next) => {
    const arr = Array(3).fill(undefined);
    const docs = arr.map((v, i) => createRandomDoc(i + 7));
    res.send(docs);
  });

  app.post('/cancel', require('express').json(), (req, res, next) => {
    res.send('Товары аннулированы');
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    res.status(500).send(err.message);
  })
}