const express = require('express');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactions');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/transactions', transactionRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
