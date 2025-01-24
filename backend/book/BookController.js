const BookRepository = require("../repository/BookRepository");

const errorMessages = require("../config/errorMessages");

class BookController {
  static async createTable() {
    await BookRepository.createTable();
  }

  static async listAll(req, res) {
    try {
      const books = await BookRepository.listAll();

      return res.status(200).json(books);
    } catch {
      return res
        .status(500)
        .json({ message: errorMessages.INTERNAL_SERVER_ERROR });
    }
  }

  static async listById(req, res) {
    try {
      const book = await BookRepository.listById(req.params.id);

      return res.status(200).json(book);
    } catch {
      return res
        .status(500)
        .json({ message: errorMessages.INTERNAL_SERVER_ERROR });
    }
  }

  static async create(req, res) {
    const title = req.body.title;
    const author = req.body.author;
    const publicationDate = req.body.publicationDate;
    const description = req.body.description;
    const image = req.body.image;

    try {
      await BookRepository.create(
        title,
        author,
        publicationDate,
        description,
        image
      );

      return res.status(201).json({ message: "Book created succesfully" });
    } catch {
      return res
        .status(500)
        .json({ message: errorMessages.INTERNAL_SERVER_ERROR });
    }
  }

  static async update(req, res) {
    const id = req.params.id;
    const title = req.body.title;
    const author = req.body.author;
    const publicationDate = req.body.publicationDate;
    const description = req.body.description;
    const image = req.body.image;

    try {
      await BookRepository.update(
        id,
        title,
        author,
        publicationDate,
        description,
        image
      );
      return res.status(200).json({ message: "Book updated succesfully" });
    } catch {
      return res
        .status(500)
        .json({ message: errorMessages.INTERNAL_SERVER_ERROR });
    }
  }

  static async delete(req, res) {
    const id = req.params.id;

    try {
      await BookRepository.delete(id);

      return res.status(200).json({ message: "Book deleted succesfully" });
    } catch {
      return res
        .status(500)
        .json({ message: errorMessages.INTERNAL_SERVER_ERROR });
    }
  }
}

module.exports = BookController;
