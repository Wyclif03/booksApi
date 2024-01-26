require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const router = require('./routes/bookRoutes')
const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err))

app.use(express.json());
app.use(router)
app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`))