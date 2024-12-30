let response = {};
let responseBody = {};

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

console.log(response);
