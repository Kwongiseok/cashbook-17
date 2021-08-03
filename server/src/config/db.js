import dotenv from 'dotenv';
dotenv.config();

if (!process.env.DB_HOST) {
  throw new Error('DB_HOST 없습니다.');
}
const host = process.env.DB_HOST;

if (!process.env.DB_NAME) {
  throw new Error('DB_NAME 없습니다.');
}
const name = process.env.DB_NAME;

if (!process.env.DB_USER) {
  throw new Error('DB_USER 없습니다.');
}
const user = process.env.DB_USER;

if (!process.env.DB_PASSWORD) {
  throw new Error('DB_PASSWORD 없습니다.');
}
const password = process.env.DB_PASSWORD;

export const dbConfig = {
  host,
  name,
  user,
  password,
};
