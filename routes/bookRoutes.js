const express = require('express');
const router = express.Router();
const { showBooks, editBook, getBookById, deleteBookById, addBookToDb } = require('../controllers/bookController');


router.get('/showBooks', showBooks);

router.put('/editBookById/:id', editBook)

router.get('/getBookById/:id', getBookById)

router.delete('/deleteBookById/:id', deleteBookById)

router.post('/addBookToDb', addBookToDb)

module.exports = router;