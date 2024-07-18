import express from 'express';
import { transfer, transactionHistory, allTransactions } from '../controllers/transactionController.js';
import checkAuth from '../middlewares/authMiddleware.js';
import checkAdmin from '../middleware/adminCheck.js';

const router = express.Router();

router.post('/transfer', transfer);
router.get('/history', checkAuth, transactionHistory);
router.get('/all', checkAuth, checkAdmin, allTransactions);

export default router;
