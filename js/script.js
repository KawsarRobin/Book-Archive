const errorNotify = document.getElementById("error-handle");
const bookContainer = document.getElementById("book-container");
const loadBook = () => {
  const searchFeild = document.getElementById("search-box");
  const searchText = searchFeild.value;
  //   console.log(searchText);
  if (searchText === "") {
    errorNotify.innerHTML = `
    <h3 class="text-center text-danger">Please Write Something!!!</h3>  
    `;
    bookContainer.textContent = "";
  } else {
    fetch(`http://openlibrary.org/search.json?q=${searchText}`)
      .then((res) => res.json())
      .then((data) => displayData(data.docs));
  }
  //Clear input feild
  searchFeild.value = "";
};

const displayData = (books) => {
  const showCount = document.getElementById("data-counter");
  bookContainer.textContent = "";
  //   console.log(books.length);
  if (books.length === 0) {
    errorNotify.innerHTML = `
      <h3 class="text-center text-danger">No Result Found!!!</h3>  
      `;
  } else {
    books.forEach((book) => {
      errorNotify.textContent = "";
      console.log(book);
      const bookDiv = document.createElement("div");
      bookDiv.innerHTML = `
          <div class="card">
                <img src="https://covers.openlibrary.org/b/id/${
                  book.cover_i
                }-M.jpg" class="display-img" alt="..."/>
                <div class="card-body">
                  <h5 class="fw-bold">${book.title}</h5>
                  <p class="">
                    <span class="fw-bold">Author:</span> ${
                      book.author_name ? book.author_name : ""
                    }
                  </p>
                  <p class="card-text">
                  <span class="fw-bold text-muted"> First Published : ${
                    book.first_publish_year ? book.first_publish_year : ""
                  } </span>
                  </p>
                </div>
              </div>
          `;
      bookContainer.appendChild(bookDiv);
    });
  }
};
