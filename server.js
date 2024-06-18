const express = require('express');
const bodyParser = require('body-parser');
const data = require(`${__dirname}/data.json`);
const fs = require('fs');
const {mapAccount} = require("./mapper.js");


const app = express();
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/api/account-list', (req, res) => {
    res.json(data["account-list"]); // Use the imported data object
});

app.get('/api/movements', (req, res) => {
    const data = require('./data.json');
    const accountId = req.query.accountId;
    const movements = data.movements.filter((movement) => movement.accountId === accountId);
    res.json(movements);
});

app.post('/api/transfer', (req, res) => {
    const data = require('./data.json');
    const newTransfer = req.body; // Get the incoming transfer data from the request body
    data.transfer.push(newTransfer); // Add the new transfer to the existing array
    fs.writeFileSync('./data.json', JSON.stringify(data, null, 2)); // Update the data.json file
    res.json(true); // Return a success response
});

app.post("/api/account-list" , (req, res) => {
    
    const data = require('./data.json');
    const newAccount = req.body; // Get the incoming account data from the request body
    const mappedAccount = mapAccount(newAccount)
    data["account-list"].push(mappedAccount); // Add the new account to the existing array
    fs.writeFileSync('./data.json', JSON.stringify(data, null, 2)); // Update the data
    res.json(true)
})

app.get('/api/data', (req, res) => {
    res.sendFile(`${__dirname}/data.json`);
});
app.get('/api/data', (req, res) => {
    res.status(200).json(data);
});

app.post('/login', (req, res, next) => {
    const isValidLogin = (req, res, next) => {
        const { user, password } = req.body;
        const isValid = user === 'admin@email.com' && password === 'test';
        res.status(200).json(isValid);
    };

    if (req.path === '/login') {
        isValidLogin(req, res, next);
    } else {
        next();
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});