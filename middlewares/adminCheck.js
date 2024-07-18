import User from '../models/user.js';

const checkAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 'admin') {
      return res.status(403).json({ status: 'failed', message: 'Access denied: Admins only' });
    }
    next();
  } catch (error) {
    res.status(500).json({ status: 'failed', message: 'Server Error' });
  }
};

export default checkAdmin;
