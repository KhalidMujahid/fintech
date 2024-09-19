const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    transaction_id: { type: String, required: true, unique: true },
    user_id: { type: String, required: true },
    amount: { type: Number, required: true },
    recipient_account_number: { type: String, required: true },
    sender_account_number: { type: String, required: true },
    description: { type: String, required: false },
}, { timestamps: true }); 

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;