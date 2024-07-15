import User from '../models/user.js';
import Transaction from '../models/transaction.js';
import sendEmail from '../config/sendEmail.js';
import mongoose from 'mongoose';

export const transfer = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { receiver, amount, sender } = req.body;

    if (!receiver || !amount || !sender) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    const recipient = await User.findOne({ email: receiver }).session(session);
    const senderUser = await User.findOne({ email: sender }).session(session);

    if (!recipient || !senderUser) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'User not found' });
    }

    if (senderUser.balance < amount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    senderUser.balance -= amount;
    recipient.balance += amount;

    await senderUser.save({ session });
    await recipient.save({ session });

    const transaction = new Transaction({
      sender: senderUser._id,
      receiver: recipient._id,
      amount,
    });
    await transaction.save({ session });

    await sendEmail(senderUser.email, 'Transaction Successful', `You have successfully transferred ${amount} to ${recipient.email}`);
    await sendEmail(recipient.email, 'Transaction Successful', `You have received ${amount} from ${senderUser.email}`);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: 'Transfer successful' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const transactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    })
      .populate('sender', 'email')
      .populate('receiver', 'email');
    
    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: 'No transactions found' });
    }

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

