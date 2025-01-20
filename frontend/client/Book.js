class Book {
  static async getBooks() {
    return fetch("http://localhost:3000/book");
  }

  static async postBook(title, author, publicationDate, description, image) {
    return fetch("http://localhost:3000/book", {
      method: "POST",
      body: JSON.stringify({
        title,
        author,
        publicationDate,
        description,
        image,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
