require('dotenv').config()
const {ENVIROMENT, PORT, FRONTEND_URL} = process.env;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
// const bodyParser = require('body-parser');
// const cookieSession = require('cookie-session')
const expressSession = require('express-session')

const indexRouter = require('./routes/index');
const ttcAlertRouter = require('./routes/ttcTwit')
const goTransitRouter = require('./routes/goTransit')
const userRouter = require('./routes/users')


const app = express();

// middleware setup
app.use(morgan(ENVIROMENT));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json()); // depricated as of 2021
app.use(cors({
  origin: [FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(expressSession({
  secret: "potato unicorn steak",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 365 * 24 * 60 * 60 * 1000, // 1 year
    sameSite: "lax",
  }
}))

// app.use(cookieSession({
//   name: 'session',
//   keys: ["where in the world is", "potato unicorn steak"],
//   maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days

// }))

// enable the "secure" flag on the sessionCookies object
// app.use((req, res, next)=>{
//   req["sessionCookies"].secure = true;
//   next();
// });

app.use('/', indexRouter);
app.use('/ttcAlerts', ttcAlertRouter)
app.use('/gotransit', goTransitRouter)
app.use('/users', userRouter)



app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));