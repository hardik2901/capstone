const express = require('express');
const app = express();
const connectDB = require('./config/db.js');
const loginPage = require('./Routes/loginPage.js');
const userActions = require('./Routes/userActions')
const cors = require('cors');
const sendEmail = require('./utils/mail.js')
require('dotenv').config();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/login', loginPage);
app.use('/api/users', userActions);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
