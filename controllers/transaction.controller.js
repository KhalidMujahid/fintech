const Transaction = require("../models/Transaction");
const generateID = require("../utils/generateID");

const createTransaction = async (req, res, next) => async (req, res) => {
  const {
    amount,
    recipient_account_number,
    sender_account_number,
    description,
  } = req.body;
  const user_id = req.user.user_id;

  if (!amount || !recipient_account_number || !sender_account_number) {
    return res
      .status(400)
      .json({
        error:
          "Amount, recipient account number, and sender account number are required.",
      });
  }

  const transaction = new Transaction({
    transaction_id: generateID(),
    user_id,
    amount,
    recipient_account_number,
    sender_account_number,
    description,
  });

  try {
    await transaction.save();

    res.status(201).json(transaction);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create transaction", details: error.message });
  }
};

const getTransactions = async (req, res) => {
  const user_id = req.user.user_id;
  const { page = 1, limit = 10 } = req.query;

  try {
    const transactions = await Transaction.find({ user_id })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Transaction.countDocuments({ user_id });

    res.json({
      transactions,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Failed to retrieve transactions",
        details: error.message,
      });
  }
};

module.exports = {
  getTransactions,
  createTransaction,
};
