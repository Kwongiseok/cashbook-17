import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('server is running : ', PORT);
});
