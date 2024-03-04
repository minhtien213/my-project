const express = require('express');
const db = require('./config/db');
const routes = require('./routes');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

// connect to DB
db.connect();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

routes(app);


app.get('/', (req, res) => {
  res.send('Welcome everyone');
});

app.listen(port, () => {
  console.log('Server listening on port: ', port);
});
