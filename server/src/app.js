import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import init from './models/index.js';
import globalController from './controller/global-controller.js';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  session({
    HttpOnly: true,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24000 * 60 * 60 },
  })
);

app.use(express.static('../dist'));
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('hi'));

app.use('/', globalController());

app.use((req, res) => res.redirect('/'));

// error handling
app.use((err, req, res, next) => {
  let statusCode = err.statusCode;
  const message = err.message;
  if (!statusCode) {
    statusCode = 500;
    next(err);
  }
  res.status(statusCode).send({ status: statusCode, message: message });
});

app.listen(PORT, () => {
  init();
  console.log('server is running : ', PORT);
});
