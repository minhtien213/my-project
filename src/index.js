const express = require('express');
const path = require('path');
const db = require('./config/db');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

// connect to DB
db.connect();

const app = express();
const port = process.env.PORT || 3001;

// Sử dụng middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.get('/', (req, res) => {
  res.send('Welcome everyone');
});

app.listen(port, () => {
  console.log('Server listening on port: ', port);
});
