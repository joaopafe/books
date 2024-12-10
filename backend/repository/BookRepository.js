const openDB = require("../configDB");

class BookRepository {
  static async createTable() {
    const db = await openDB();

    return db.exec(
      `CREATE TABLE IF NOT EXISTS Book
      (id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT, author TEXT, publication_date DATE,
      description TEXT, image TEXT
      )`
    );
  }

  static async listAll() {
    const db = await openDB();

    return db.run(`SELECT * FROM Book`);
  }

  static async create(title, author, publicationDate, description, image) {
    const db = await openDB();

    return db.all(
      `INSERT INTO Book (title, author,
      publication_date, description, image)
      VALUES (?, ?, ?, ?, ?)
      `,
      [title, author, publicationDate, description, image]
    );
  }

  static async update(id, title, author, publicationDate, description, image) {
    const db = await openDB();

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
    const db = await openDB();

    return db.all(`DELETE FROM Book WHERE id = ?`, [id]);
  }
}

module.exports = BookRepository;
