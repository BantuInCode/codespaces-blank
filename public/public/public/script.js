const addTransactionButton = document.getElementById('add-transaction');
const transactionDescriptionInput = document.getElementById('transaction-description');
const transactionAmountInput = document.getElementById('transaction-amount');
const transactionTypeSelect = document.getElementById('transaction-type');
const transactionList = document.getElementById('transactions');
const financeChart = document.getElementById('financeChart').getContext('2d');

let transactions = [];

// Function to fetch transactions and display them
function fetchTransactions() {
    fetch('/api/transactions')
        .then(response => response.json())
        .then(data => {
            transactions = data;
            updateTransactionList();
            updateDashboard();
        });
}

// Function to update the transaction list
function updateTransactionList() {
    transactionList.innerHTML = '';
    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.innerHTML = `${transaction.description} - $${transaction.amount} 
        <button onclick="deleteTransaction('${transaction.id}')">Delete</button>`;
        transactionList.appendChild(li);
    });
}

// Function to update the dashboard chart
function updateDashboard() {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const balance = income - expenses;

    const chartData = {
        labels: ['Income', 'Expenses', 'Balance'],
        datasets: [{
            label: 'Financial Overview',
            data: [income, expenses, balance],
            backgroundColor: ['green', 'red', 'blue'],
        }]
    };

    new Chart(financeChart, {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to add a new transaction
addTransactionButton.addEventListener('click', () => {
    const description = transactionDescriptionInput.value;
    const amount = parseFloat(transactionAmountInput.value);
    const type = transactionTypeSelect.value;

    fetch('/api/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, amount, type }),
    })
        .then(response => response.json())
        .then(() => {
            transactionDescriptionInput.value = '';
            transactionAmountInput.value = '';
            fetchTransactions();
        });
});

// Function to delete a transaction
function deleteTransaction(id) {
    fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
    }).then(() => fetchTransactions());
}

// Initial fetch
fetchTransactions();
