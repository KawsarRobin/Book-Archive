const searchField = document.getElementById("search-box");
const errorNotify = document.getElementById("error-handle");
const bookContainer = document.getElementById("book-container");
const TotalResultNumber = document.getElementById("total-result");
const loadBook = () => {
  const searchText = searchField.value;
  //   console.log(searchText);
  if (searchText === "") {
    errorNotify.innerHTML = `
    <h3 class="text-center text-danger">Please Write Something!!!</h3>  
    `;
    bookContainer.textContent = "";
    TotalResultNumber.textContent = "";
  } else {
    fetch(`http://openlibrary.org/search.json?q=${searchText}`)
      .then((res) => res.json())
      .then((data) => displayData(data));
  }
  //Clear input field
  searchField.value = "";
};

const displayData = (data) => {
  const books = data.docs.slice(0, 30);
  console.log(data.numFound);
  TotalResultNumber.innerHTML = ` 
<h5>Total Result found ${data.numFound}</h5>
`;
  bookContainer.textContent = "";
  // console.log(books);
  if (books.length === 0) {
    errorNotify.innerHTML = `
      <h3 class="text-center text-danger">No Result Found!!!</h3>  
      `;
    TotalResultNumber.textContent = "";
  } else {
    books.forEach((book) => {
      errorNotify.textContent = "";
      // console.log(book);
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
                  <span class="fw-bold"> First Published : </span>
                  ${book.first_publish_year ? book.first_publish_year : ""}
                  </p>
                  <p class="card-text">
                  <span class="fw-bold">Publisher :</span>
                  ${book.publisher ? book.publisher : ""} 
                  </p>
                </div>
              </div>
          `;
      bookContainer.appendChild(bookDiv);
    });
  }
};
