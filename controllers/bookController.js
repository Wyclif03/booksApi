const createError = require('http-errors');

let books = [
    {title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', read: true, id: 1}, 
    {title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', read: false, id: 2}, 
    {title: 'The Hobbit', author: 'J.R.R. Tolkien', read: true, id: 3}, 
    ];

// SHOW ALL BOOKS
exports.showBooks = (req, res, next) => {
    res.send(books)
}

// ADD A BOOK
exports.addBook = (req, res, next) => {

    //CHECKING IF ALL INFO IS THERE - IF NOT ERROR
    const isMissingInformation = !req.body.title || !req.body.author || !req.body.read === undefined || !req.body.id === undefined
    if (isMissingInformation) return next(createError(400, 'Please fill out all of the fields.'))

    // /VARIABLE FOR NEW BOOK
    const newBook = req.body;

    // ASSIGN A UNIQUE ID
    req.body.id = books.length + 1 +Date.now()

    // Validate the 'read' property to ensure it's a boolean value
    if (typeof newBook.read !== 'boolean') {
        return next(createError(400, 'Invalid value for the "read" property. It should be a boolean.'));
    }
        // if all true add book to books array + return array to user / postman
       books.push(req.body)
        res.send(books)    
}

//REMOVE A BOOK
exports.removeBook = (req, res, next) => {
    console.log("removeBook function")
    books.pop()
    res.send({message: "Book has been removed", books: books})
}

// UPDATE -EDIT A BOOK
exports.editBook = (req, res, next) => {
    const updatedBook = req.body; // Get the updated book data from the request body
    let bookFound = false; // if the book is found
    // Iterate over the books array
    books.forEach((book, index) => {
        // If the current book's id matches the updated book's id, update the book in the array
        if (book.id === updatedBook.id) {
            books[index] = Object.assign(book, updatedBook);
            bookFound = true;
        }
        
    });
    if (!bookFound) {
        next(createError(404, 'Book not found'));
    } else {
        res.send({message: "Book updated", books: books});
    }
}
//RETURN BOOK BY ID
exports.getBookById = (req, res, next) => {
    const bookId = parseInt(req.params.id);
    if (isNaN(bookId)) {
        return next(createError(400, 'Invalid book ID'));
    }
    
    // Match request with book ID's     
    const foundBook = books.find(book => book.id === bookId);


    // Error if not found
    if (!foundBook) {
        return next(createError(404, 'Book not found'));
    }

// Return book
    res.send(foundBook);
}

//DELETE BOOK BY ID
exports.deleteBookById = (req, res, next) => {
        const bookId = parseInt(req.params.id);
        if (isNaN(bookId)) {
            return next(createError(400, 'Invalid book ID'));
        } 
        
        const index = books.findIndex(book => book.id === bookId);
        books.splice(index, 1)

    
    res.send(books)
}