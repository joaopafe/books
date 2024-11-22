const BookRepository = require("../repository/BookRepository");

class BookController {
  static async createTable() {
    await BookRepository.createTable();
  }

  static async listAll(req, res) {
    const books = await BookRepository.listAll();

    return res.json(books);
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

    return res.json({ message: "Book created succesfully" });
  }
}
