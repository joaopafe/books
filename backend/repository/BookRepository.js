const openDB = require("../configDB");

class BookRepository {
  static db = openDB();

  static async createTable() {
    this.db.exec(
      `CREATE TABLE IF NOT EXISTS Book
      (id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT, author TEXT, publication_date DATE,
      description TEXT, image TEXT
      )`
    );
  }

  static async listAll() {
    this.db.run(`SELECT * FROM Book`);
  }
}

module.exports = BookRepository;
