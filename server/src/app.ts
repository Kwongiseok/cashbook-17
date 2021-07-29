import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import globalController from './controller/GlobalController';
import init from './models';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_CALLBACK_URL}`
  );
});

app.get('/auth/github/callback', (req, res) => {
  console.log(req.query);
});

app.listen(PORT, () => {
  init();
  console.log('server is running : ', PORT);
});

app.use('/', globalController());
