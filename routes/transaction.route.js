const { Router } = require("express");
const { createTransaction,getTransactions } = require("../controllers/transaction.controller");
const { auth } = require("../middlewares/auth");

const transactionRoter = Router();

transactionRoter.post("/transactions", auth, createTransaction);

transactionRoter.get("/transactions", auth ,getTransactions)

module.exports = transactionRoter;