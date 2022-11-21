require('dotenv').config()
const {ENVIROMENT, PORT} = process.env;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const defaultRoutes = require('./routes/default')
const ttcTwitterRouter = require('./routes/ttcTwit')

const app = express();

// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());
app.use(cors());

app.use('/', indexRouter);
app.use('/count', defaultRoutes)
app.use('/transit', ttcTwitterRouter)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));