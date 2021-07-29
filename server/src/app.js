import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import axios from 'axios';
import init from './models/index.js';
import { userRepository } from './repository/UserRepository.js';

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

const PORT = process.env.PORT || 8080;

app.get('/auth/github', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_CALLBACK_URL}`
  );
});
app.get('/auth/github/callback', async (req, res) => {
  const { code } = req.query;
  const TOKEN_URL = `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`;
  const { data } = await axios.post(TOKEN_URL);
  const searchParams = new URLSearchParams(data);
  const accessToken = searchParams.get('access_token'); // access token 획득
  const USER_PROFILE_URL = 'https://api.github.com/user';
  const {
    data: { id },
  } = await axios.get(USER_PROFILE_URL, {
    headers: {
      Authorization: `token ${accessToken}`, // Authorization 헤더 설정
    },
  });
  const user = await userRepository.findById(id);
  if (!user) userRepository.createUser(id);
  req.session.user = user;
  res.redirect('/hi');
});

app.get('/test', (req, res) => {
  console.log(req.session.user);
});

app.listen(PORT, () => {
  init();
  console.log('server is running : ', PORT);
});

// app.use('/', globalController());
