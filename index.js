const express = require('express');
const App = express();
const PORT = 5060;

App.use(express.json());

App.get('/', (req, res) => {
    res.status(200).send('<h1>INTRO EXPRESS API</h1>');
});

const { usersRouter } = require('./routers')
App.use('/users', usersRouter);

App.listen(PORT, () => console.log('API Express Running', PORT));