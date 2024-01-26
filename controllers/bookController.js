const createError = require('http-errors');
const Book = require("../models/books");



// SHOW ALL BOOKS
exports.showBooks = async function (req, res) {
    try {
        const books = await Book.find();
        res.send(books)
    } catch (err) {
        return next(createError(500, err.message))
    }
}


// ADD A BOOK
exports.addBook = (req, res, next) => {

    //CHECKING IF ALL INFO IS THERE - IF NOT ERROR
    const isMissingInformation = !req.body.title || !req.body.author || !req.body.read === undefined || !req.body.id === undefined
    if (isMissingInformation) return next(createError(400, 'Please fill out all of the fields.'))

    // /VARIABLE FOR NEW BOOK
    const newBook = req.body;

    // ASSIGN A UNIQUE ID
    req.body.id = books.length + 1 + Date.now()

    // Validate the 'read' property to ensure it's a boolean value
    if (typeof newBook.read !== 'boolean') {
        return next(createError(400, 'Invalid value for the "read" property. It should be a boolean.'));
    }
    // if all true add book to books array + return array to user / postman
    books.push(req.body)
    res.send(books)
}

// UPDATE -EDIT A BOOK
exports.editBook = async function (req, res, next) {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) {
            return next(createError(404, "cannot find book by ID"));
        }
        res.send(updatedBook);
    } catch (err) {
        return next(createError(500, err.message));
    }
}


//RETURN BOOK BY ID
exports.getBookById = async function (req, res, next) {
    try {
        const correctIdBook = await Book.findById(req.params.id);
        if (!correctIdBook) {
            return next(createError(404, "no book with that id"));
        }
        res.send(correctIdBook);
    } catch (err) {
        return next(createError(500, err.message));
    }
};



//DELETE BOOK BY ID

exports.deleteBookById = async function (req, res, next) {
    try {
        const bookItemToDelete = await Book.findByIdAndDelete(req.params.id);
        if (!bookItemToDelete) {
            return next(createError(404, "no book with that id"));
        }
        res.send({ result: true });
    } catch (err) {
        return next(createError(500, err.message));
    }
};


// ADD BOOK TO MONGODB

exports.addBookToDb = async function (req, res, next) {
    try {
        if (!req.body.title) {
            return next(createError(400, "title is required"));
        }
        const bookItem = new Book({
            title: req.body.title,
        });
        await bookItem.save();
        res.send(bookItem);
    } catch (err) {
        return next(createError(500, err.message));
    }
};

