const express = require('express');
const router = express.Router();
const {showBooks, addBook, removeBook, editBook, getBookById, deleteBookById} = require('../controllers/bookController');


router.get('/showBooks', showBooks);

router.post('/addBook', addBook)

router.delete('/removeBook', removeBook)

router.put('/editBook', editBook)

router.get('/getBookById/:id', getBookById)

router.delete('/deleteBookById/:id', deleteBookById)

module.exports = router;