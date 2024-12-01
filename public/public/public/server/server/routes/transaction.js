const express = require('express');
const router = express.Router();

let transactions = [];
let idCounter = 1;

// GET all transactions
router.get('/', (req, res) => {
    res.json(transactions);
});

// POST a new transaction
router.post('/', (req, res) => {
    const newTransaction = {
        id: idCounter++,
        description: req.body.description,
        amount: req.body.amount,
        type: req.body.type,
    };
    transactions.push(newTransaction);
    res.status(201).json(newTransaction);
});

// DELETE a transaction
router.delete('/:id', (req, res) => {
    transactions = transactions.filter(transaction => transaction.id !== parseInt(req.params.id));
    res.status(204).send();
});

module.exports = router;
