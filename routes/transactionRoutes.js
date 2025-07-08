import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { handleValidation } from "../middleware/handleValidation.js";
import { transactionValidationRules } from "../middleware/validateTransaction.js";
import {
  addTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionContoller.js";

const router = express.Router();

router
  .route("/")
  .post(
    authenticate,
    transactionValidationRules,
    handleValidation,
    addTransaction
  )
  .get(authenticate, getTransactions);

router
  .route("/:id")
  .get(authenticate, getTransactionById)
  .put(
    authenticate,
    transactionValidationRules,
    handleValidation,
    updateTransaction
  )
  .delete(authenticate, deleteTransaction);

export default router;
