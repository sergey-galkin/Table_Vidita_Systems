const { createRandomDoc } = require("./docsCreator");

module.exports = function (app) {
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
    console.log(req.body);
    res.send('Товары аннулированы');
  });

  app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send(err.message);
  })
}