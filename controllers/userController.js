import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendEmail from '../config/sendEmail.js';

const sendResponse = (res, status, message, token = null) => {
  const response = { status, message };
  if (token) response.token = token;
  res.status(status === 'success' ? 200 : 400).json(response);
};

const generateToken = (userID) => {
  return jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: '5d' });
};

export const userRegistration = async (req, res) => {
  const { name, email, password, password_confirmation, tc } = req.body;
  if (!name || !email || !password || !password_confirmation || !tc) {
    return sendResponse(res, 'failed', 'All fields are required');
  }
  
  if (password !== password_confirmation) {
    return sendResponse(res, 'failed', "Password and Confirm Password don't match");
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return sendResponse(res, 'failed', 'Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashPassword, tc });
    await newUser.save();

    const token = generateToken(newUser._id);

    const emailSubject = 'Welcome to Our Wallet-API!';
    const emailText = `Hello ${name},\n\nThank you for registering. We're excited to have you on board!\n\nBest regards,\nThe Team`;

    try {
      await sendEmail(email, emailSubject, emailText);
      sendResponse(res, 'success', 'Registration Success', token);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      sendResponse(res, 'success', 'Registration Success, but failed to send email', token);
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ status: 'failed', message: 'Unable to Register' });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return sendResponse(res, 'failed', 'All fields are required');
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return sendResponse(res, 'failed', 'Invalid email or password');
    }

    const token = generateToken(user._id);
    sendResponse(res, 'success', 'Login Success', token);
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ status: 'failed', message: 'Unable to Login' });
  }
};

export const loggedUser = async (req, res) => {
  res.status(200).json({ user: req.user });
};
