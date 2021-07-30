import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import init from './models/index.js';
import { serverConfig } from './config/server-env.js';
import globalController from './controller/global-controller.js';
import errorControl from './middleware/error-control.js';

const initDB = init;
const PORT = serverConfig.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  session({
    HttpOnly: true,
    secret: serverConfig.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24000 * 60 * 60 },
  })
);

app.use(express.static('../dist'));

app.get('/', (req, res) => res.send('hi'));

app.use('/', globalController());

app.use((req, res) => res.redirect('/'));

app.use(errorControl);

app.listen(PORT, () => {
  initDB();
  console.log('server is running : ', PORT);
});
