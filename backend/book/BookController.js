const BookRepository = require("../repository/BookRepository");

class BookController {
  static async createTable() {
    await BookRepository.createTable();
  }

  static async listAll(req, res) {
    const books = await BookRepository.listAll();

    return res.status(200).json(books);
  }

  static async listById(req, res) {
    const book = await BookRepository.listById(req.params.id);

    return res.status(200).json(book);
  }

  static async create(req, res) {
    const title = req.body.title;
    const author = req.body.author;
    const publicationDate = req.body.publicationDate;
    const description = req.body.description;
    const image = req.body.image;

    await BookRepository.create(
      title,
      author,
      publicationDate,
      description,
      image
    );

    return res.status(201).json({ message: "Book created succesfully" });
  }

  static async update(req, res) {
    const id = req.params.id;
    const title = req.body.title;
    const author = req.body.author;
    const publicationDate = req.body.publicationDate;
    const description = req.body.description;
    const image = req.body.image;

    await BookRepository.update(
      id,
      title,
      author,
      publicationDate,
      description,
      image
    );

    return res.status(200).json({ message: "Book updated succesfully" });
  }

  static async delete(req, res) {
    const id = req.params.id;

    await BookRepository.delete(id);

    return res.status(200).json({ message: "Book deleted succesfully" });
  }
}

module.exports = BookController;
