const openDB = require("../configDB");

class BookRepository {
  static async createTable() {
    const db = await openDB();

    db.exec(
      `CREATE TABLE IF NOT EXISTS Book
      (id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT, author TEXT, publication_date DATE,
      description TEXT, image TEXT
      )`
    );
  }
}

module.exports = BookRepository;
