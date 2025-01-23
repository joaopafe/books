let response = {};
let responseBody = {};

const inputFile = document.querySelector("#new-image-input");
const pictureImage = document.querySelector("#image-input");
const modalElement = document.querySelector("#new-book-form");
const searchInput = document.querySelector("#search-input");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const publicationDateInput = document.querySelector("#publication-date-input");
const descriptionInput = document.querySelector("#description-input");

const getBooks = async () => {
  response = await Book.getBooks();

  if (response.status === 500) {
    window.alert("Servidor fora de ar. Tente novamente mais tarde");
  }

  if (response.status === 200) {
    responseBody = await response.json();

    listBooks(responseBody);
  }
};

const listBooks = (bookList) => {
  document.getElementById("books-area").innerHTML = "";

  bookList.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.className = "book";
    bookDiv.id = `book-${book.id}`;

    let description = "";

    if (book.description.length <= 300) description = book.description;

    if (book.description.length > 300)
      description = `${book.description.slice(0, 300)}...`;

    bookDiv.innerHTML = `
      <div id="book-image">
        <img src="data:image/png;base64,${book.image}" alt="${book.title}"/>
      </div>
      <div id="book-informations">
        <div id="book-title" onclick="openBookDetails(${book.id})">${book.title}</div>
        <div id="book-description">
            ${description}
        </div>
      </div>
    `;

    document.getElementById("books-area").appendChild(bookDiv);
  });
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
      imageElement.setAttribute("id", "new-image-for-post");
      imageElement.setAttribute("for", "new-image-input");

      pictureImage.innerHTML = `
        <label for="new-image-input" id="image-label"> <label/>
      `;

      const imageLabel = document.querySelector("#image-label");

      imageLabel.appendChild(imageElement);
    });

    reader.readAsDataURL(file);
  }
});

const openModal = (modalElement) => {
  modalElement.style.display = "flex";
};

const closeModal = (modalElement) => {
  modalElement.style.display = "none";
};

const formatString = (value) => {
  return value.toLowerCase().trim();
};

searchInput.addEventListener("input", (event) => {
  const value = formatString(event.target.value);
  const books = document.querySelectorAll(".book");

  books.forEach((book) => {
    if (formatString(book.innerText).indexOf(value) !== -1) {
      book.style.display = "flex";
    }

    if (formatString(book.innerText).indexOf(value) === -1) {
      book.style.display = "none";
    }
  });
});

const validateBook = () => {
  const title = titleInput.value;
  const author = authorInput.value;
  const publicationDate = publicationDateInput.value;
  const description = descriptionInput.value;
  const imageInput = document.querySelector("#new-image-for-post");

  if (
    title.length === 0 ||
    author.length === 0 ||
    publicationDate.length === 0 ||
    description.length === 0 ||
    !imageInput
  ) {
    window.alert("Preencha todos os campos de forma válida");
  }

  if (
    title.length > 0 &&
    author.length > 0 &&
    publicationDate.length > 0 &&
    description.length > 0 &&
    imageInput
  ) {
    const image = imageInput.src.slice(23);

    postBook(title, author, publicationDate, description, image);
  }
};

const postBook = async (title, author, publicationDate, description, image) => {
  await Book.postBook(title, author, publicationDate, description, image);

  closeModal(modalElement);
  getBooks();
};

const openBookDetails = (bookId) => {
  localStorage.setItem("bookId", bookId);

  window.location.href = "../bookDetailsPage/book-details.page.html";
};

getBooks();
