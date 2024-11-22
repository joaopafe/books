const openDB = require("../configDB");
const db = await openDB;

class BookRepository {
  static async createTable() {
    return db.exec(
      `CREATE TABLE IF NOT EXISTS Book
      (id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT, author TEXT, publication_date DATE,
      description TEXT, image TEXT
      )`
    );
  }

  static async listAll() {
    return db.run(`SELECT * FROM Book`);
  }

  static async create(title, author, publicationDate, description, image) {
    return db.all(
      `INSERT INTO Book (title, author,
      publication_date, description, image)
      VALUES (?, ?, ?, ?, ?)
      `,
      [title, author, publicationDate, description, image]
    );
  }

  static async update(id, title, author, publicationDate, description, image) {
    return db.all(
      `UPDATE Book SET
      title = ?,
      author = ?,
      author = ?,
      publicationDate = ?,
      description = ?,
      image = ?
      WHERE id = ?
      `,
      [title, author, publicationDate, description, image, id]
    );
  }

  static async delete(id) {
    return db.all(`DELETE FROM Book WHERE id = ?`, [id]);
  }
}

module.exports = BookRepository;
