const searchField = document.getElementById("search-box");
const bookContainer = document.getElementById("book-container");
const totalResultNumber = document.getElementById("total-result");
const errorNotify = document.getElementById("error-handle");

// ------------------------------------------Load Data from API ---------------------------------------//
const loadBook = () => {
  const searchText = searchField.value;
  if (searchText === "") {
    //---------error handle--------//
    errorNotify.innerHTML = ` <h3 class="text-center text-danger">Please Write Something!!!</h3> `;
    bookContainer.textContent = "";
    totalResultNumber.textContent = "";
    displaySpinner("none");
  } else {
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
      .then((res) => res.json())
      .then((data) => displayData(data));
    displaySpinner("block");
  }
  //------Clear input field--------//
  searchField.value = "";
};
// --------------------------------------------------Display Book Data--------------------------------//
const displayData = (data) => {
  const books = data.docs.slice(0, 30);
  //--------Display Total Data---------//
  totalResultNumber.innerHTML = `<h5>Total ${data.numFound} Result found</h5>`;
  bookContainer.textContent = "";

  if (books.length === 0) {
    errorNotify.innerHTML = `<h3 class="text-center text-danger">No Result Found!!!</h3> `;
    totalResultNumber.textContent = "";
    displaySpinner("none");
  } else {
    books.forEach((book) => {
      errorNotify.textContent = "";
      const bookDiv = document.createElement("div");
      bookDiv.innerHTML = `
          <div class="card overflow-hidden">
                <img src='https://covers.openlibrary.org/b/id/${
                  book.cover_i ? book.cover_i : 10909258
                }-M.jpg' 
                class="display-img" alt="..."/>
                <div class="card-body">
                  <h5 class="fw-bold">${book.title}</h5>
                  <p class="">
                    <span class="fw-bold">Author: </span> ${
                      book.author_name ? book.author_name[0] : ""
                    }
                  </p>
                  <p class="card-text">
                  <span class="fw-bold"> First Published: </span>
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
    displaySpinner("none");
  }
};
//-------------------Display spinner--------------------------------//
const displaySpinner = (value) => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = value;
};
