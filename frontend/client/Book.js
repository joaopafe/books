class Book {
  static async getBooks() {
    return fetch("http://localhost:3000/book");
  }
}
