const express = require('express');
const app = express();
const connectDB = require('./config/db.js');
const loginPage = require('./Routes/loginPage.js');
const userActions = require('./Routes/userActions')
const roomActions = require('./Routes/roomActions.js')
const bookRoom = require('./Routes/roomBookRequest.js')
const cors = require('cors');
require('dotenv').config();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/login', loginPage);
app.use('/api/users', userActions);
app.use('/api/rooms', roomActions);
app.use('/api/bookroom', bookRoom);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
