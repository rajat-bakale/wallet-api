import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const checkAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1];
      const { userID } = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(userID).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ status: 'failed', message: 'Unauthorized User' });
    }
  } else {
    res.status(401).json({ status: 'failed', message: 'Unauthorized User, No Token' });
  }
};

export default checkAuth;
