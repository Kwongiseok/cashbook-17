if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET 없습니다.');
}
const secret = process.env.SESSION_SECRET;

const port = process.env.SERVER_PORT;

export const serverConfig = {
  secret,
  port,
};
