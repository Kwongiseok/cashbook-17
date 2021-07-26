import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import globalController from './controller/GlobalController';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('server is running : ', PORT);
});

app.use('/', globalController());
