class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  displayBooksFromLocalStorage() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    books.forEach(function (book) {
      const list = document.getElementById('book-list');
      const row = document.createElement('tr');
      row.innerHTML = `
        <td> ${book.title} </td>
        <td> ${book.author} </td>
        <td> ${book.isbn} </td>
        <td><a href= "" class = "delete">X</a></td>    `;
      list.appendChild(row);
    });
  }
  addBookToList(book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td> ${book.title} </td>
    <td> ${book.author} </td>
    <td> ${book.isbn} </td>
    <td><a href= "" class = "delete">X</a></td>    `;
    list.appendChild(row);
  }

  showAlert(message, className) {
    const div = document.createElement('div');

    //add classname

    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');

    //get form

    const form = document.querySelector('#book-form');

    //insert alert

    container.insertBefore(div, form);

    //timeout after 3 sec
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }
  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }
  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
  storeBookInLocalStorage(book) {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

//event listening

document.getElementById('book-form').addEventListener('submit', function (e) {
  //get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  //instantiate book
  const book = new Book(title, author, isbn);

  //instantiate ui
  const ui = new UI();

  // validate
  if (title === '' || author === '' || isbn === '') {
    //error alert

    ui.showAlert('please fill in all fields', 'error');
  } else {
    //add book to list

    ui.addBookToList(book);

    // store book in local storage
    ui.storeBookInLocalStorage(book);

    //show success
    ui.showAlert('Book added', 'success');

    //clear fields
    ui.clearFields();
  }
  e.preventDefault();
});

//event listening for delete
document.getElementById('book-list').addEventListener('click', function (e) {
  //instantiate UL
  const ui = new UI();

  //delete book
  ui.deleteBook(e.target);

  //show message

  ui.showAlert('Book removed', 'success');

  e.preventDefault();
});

document.addEventListener('DOMContentLoaded', function () {
  const ui = new UI();
  ui.displayBooksFromLocalStorage();
});
