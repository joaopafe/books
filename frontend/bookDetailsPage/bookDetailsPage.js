let response = {};
let responseBody = {};

const bookId = localStorage.getItem("bookId");

const titleElement = document.querySelector("#book-title");
const authorElement = document.querySelector("#book-author");
const publicationDateElement = document.querySelector("#publication-date");
const descriptionElement = document.querySelector("#book-description");
const imageElement = document.querySelector("#book-image");

const getBook = async () => {
  response = await Book.getBookById(bookId);

  if (response.status === 500) {
    window.alert("Servidor fora de ar. Tente novamente mais tarde");
  }

  if (response.status === 404) {
    window.alert("Livro não encontrado.");
  }

  if (response.status === 200) {
    responseBody = await response.json();

    const book = responseBody[0];

    loadPage(book);
  }
};

const loadPage = (book) => {
  document.querySelector("title").innerHTML = book.title;
  titleElement.innerHTML = book.title;
  authorElement.innerHTML = `Por ${book.author}`;
  publicationDateElement.innerHTML = `Publicado em ${book.publication_date}`;
  descriptionElement.innerHTML = book.description;

  imageElement.innerHTML = `
    <img src = "data:image/png;base64,${book.image}" alt="${book.title}"/>
  `;
};

const returnPage = () => {
  window.location.href = "../bookPage/book-page.html";
};

getBook();
