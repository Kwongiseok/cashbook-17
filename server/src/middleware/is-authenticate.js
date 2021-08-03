export default function isAuthenticate(req, res, next) {
  try {
    const user = req.session.user;
    if (user) {
      req.user_id = user;
    } else {
      // 비로그인한 유저 (Test User Id)
      req.user_id = '1';
    }
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
}
