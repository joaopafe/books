let response = {};
let responseBody = {};
let book = {};

const bookId = localStorage.getItem("bookId");

const titleElement = document.querySelector("#book-title");
const authorElement = document.querySelector("#book-author");
const publicationDateElement = document.querySelector("#publication-date");
const descriptionElement = document.querySelector("#book-description");
const imageElement = document.querySelector("#book-image");
const modalElement = document.querySelector("#edit-book-form");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const publicationDateInput = document.querySelector("#publication-date-input");
const descriptionInput = document.querySelector("#description-input");
const inputFile = document.querySelector("#edit-image-input");
const pictureImage = document.querySelector("#image-input");

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

    book = responseBody[0];

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

const openModal = (modalElement) => {
  fillInFormInformation();

  modalElement.style.display = "flex";
};

const closeModal = (modalElement) => {
  modalElement.style.display = "none";
};

const fillInFormInformation = () => {
  titleInput.value = book.title;
  authorInput.value = book.author;
  publicationDateInput.value = book.publication_date;
  descriptionInput.value = book.description;

  pictureImage.innerHTML = `
    <label for="edit-image-input" id="image-label"> </label>
  `;

  const imageElement = document.createElement("img");
  imageElement.src = `data:image/png;base64,${book.image}`;
  imageElement.setAttribute("id", "edit-image-for-post");
  imageElement.setAttribute("for", "edit-image-input");

  const imageLabel = document.querySelector("#image-label");

  imageLabel.appendChild(imageElement);
};

inputFile.addEventListener("change", (e) => {
  const inputTarget = e.target;
  const file = inputTarget.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
      const readerTarget = e.target;

      const imageElement = document.createElement("img");
      imageElement.src = readerTarget.result;
      imageElement.setAttribute("id", "edit-image-for-post");
      imageElement.setAttribute("for", "edit-image-input");

      pictureImage.innerHTML = `
        <label for="edit-image-input" id="image-label"> <label/>
      `;

      const imageLabel = document.querySelector("#image-label");

      imageLabel.appendChild(imageElement);
    });

    reader.readAsDataURL(file);
  }
});

getBook();
