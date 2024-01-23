const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes/bookRoutes');

app.get('/', (req, res) => {
    res.send('Welcome to my book api!')
});

app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log('Server is running on port' + port)
})