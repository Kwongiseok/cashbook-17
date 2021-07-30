if (!process.env.GITHUB_CALLBACK_URL) {
  throw new Error('GITHUB_CALLBACK_URL 없습니다.');
}
const callbackURL = process.env.GITHUB_CALLBACK_URL;

if (!process.env.GITHUB_PROFILE_URL) {
  throw new Error('GITHUB_PROFILE_URL 없습니다.');
}
const profileURL = process.env.GITHUB_PROFILE_URL;

if (!process.env.GITHUB_SIGN_URL) {
  throw new Error('GITHUB_SIGN_URL 없습니다.');
}
const signURL = process.env.GITHUB_SIGN_URL;

if (!process.env.GITHUB_TOKEN_URL) {
  throw new Error('GITHUB_TOKEN_URL 없습니다.');
}
const tokenURL = process.env.GITHUB_TOKEN_URL;

export const githubConfig = {
  callbackURL,
  profileURL,
  signURL,
  tokenURL,
};
