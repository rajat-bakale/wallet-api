import express from 'express';
import { transfer, transactionHistory, allTransactions } from '../controllers/transactionController.js';
import checkAuth from '../middlewares/authMiddleware.js';
import adminCheck from '../middlewares/adminCheck.js';

const router = express.Router();

router.post('/transfer', transfer);
router.get('/history', checkAuth, transactionHistory);
router.get('/all', checkAuth, adminCheck, allTransactions);

export default router;
