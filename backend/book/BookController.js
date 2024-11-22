const BookRepository = require("../repository/BookRepository");

class BookController {
  static async createTable() {
    await BookRepository.createTable();
  }

  static async listAll() {
    await BookRepository.listAll();
  }
}
