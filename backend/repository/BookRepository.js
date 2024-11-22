const openDB = require("../configDB");

class BookRepository {
  static db = openDB();

  static async createTable() {
    return this.db.exec(
      `CREATE TABLE IF NOT EXISTS Book
      (id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT, author TEXT, publication_date DATE,
      description TEXT, image TEXT
      )`
    );
  }

  static async listAll() {
    return this.db.run(`SELECT * FROM Book`);
  }

  static async create(title, author, publicationDate, description, image) {
    return this.db.all(
      `INSERT INTO Book (title, author,
      publication_date, description, image)
      VALUES (?, ?, ?, ?, ?)
      `,
      [title, author, publicationDate, description, image]
    );
  }
}

module.exports = BookRepository;
