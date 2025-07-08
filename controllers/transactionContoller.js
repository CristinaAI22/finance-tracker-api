import { Transaction } from "../models/Transaction.js";
import asyncHandler from "express-async-handler";

export const addTransaction = asyncHandler(async (req, res) => {
  const { type, category, amount, description, date } = req.body;

  const transaction = await Transaction.create({
    user: req.user.id,
    type,
    category,
    amount,
    description,
    date,
  });
  res.status(201).json(transaction);
});

export const getTransactions = asyncHandler(async (req, res) => {
  const { month, category, type } = req.query;

  let query = { user: req.user.id };

  if (type) query.type = type;
  if (category) query.category = category;
  if (month) {
    const start = new Date(`${month}-01`);
    const end = new Date(`${month}-31`);
    query.date = { $gte: start, $lte: end };
  }
  const transactions = await Transaction.find(query).sort({ date: -1 });
  res.status(200).json(transactions);
});

export const getTransactionById = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findOne({
    _id: req.params.id,
    user: req.user.id,
  });
  if (!transaction) {
    res.status(400);
    throw new Error("Transaction not found");
  }
  res.status(200).json(transaction);
});

export const updateTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found");
  }
  const { type, category, amount, description, date } = req.body;

  transaction.type = type || transaction.type;
  transaction.category = category || transaction.category;
  transaction.amount = amount || transaction.amount;
  transaction.description = description || transaction.description;
  transaction.date = date || transaction.date;

  const updated = await transaction.save();

  res.status(200).json(updated);
});

export const deleteTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findOne({
    _id: req.params.id,
    user: req.user.id,
  });
  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found");
  }
  await transaction.deleteOne();

  res.status(200).json({ msg: "Transaction removed" });
});
