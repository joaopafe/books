const errorMessages = require("../config/errorMessages");
const BookRepository = require("../repository/BookRepository");

const verifyIfExistsBook = async (req, res, next) => {
  const books = await BookRepository.listAll();

  const book = books.filter((book) => book.id === req.params.id);

  if (book.length != 1)
    return res.status(404).json({ message: errorMessages.BOOK_NOT_EXISTS });

  next();
};

module.exports = verifyIfExistsBook;
