const express = require('express');
const app = express();
const connectDB = require('./config/db.js')

require('dotenv').config();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});