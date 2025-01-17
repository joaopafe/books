let response = {};
let responseBody = {};

const inputFile = document.querySelector("#new-image-input");
const pictureImage = document.querySelector("#image-input");

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
        <img src="data:image/png;base64,${book.image}" alt="" srcset="" />
      </div>
      <div id="book-informations">
        <div id="book-title">${book.title}</div>
        <div id="book-description">
            ${description}
        </div>
      </div>
    `;

    document.getElementById("books-area").appendChild(bookDiv);
  });
};

getBooks();

inputFile.addEventListener("change", (e) => {
  const inputTarget = e.target;
  const file = inputTarget.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
      const readerTarget = e.target;

      const imageElement = document.createElement("img");
      imageElement.src = readerTarget.result;
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
