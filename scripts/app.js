import { Book } from './library.js'

const myLibrary = [];

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const booksContainer = document.querySelector(".books-container");

const addToBookBtn = document.querySelector(".open-dialog-btn");
const closeDialogBtn = document.querySelector(".close-dialog-btn");
const formDialog = document.querySelector(".form-dialog");
addToBookBtn.addEventListener("click", (e) => {
    formDialog.showModal();
});

closeDialogBtn.addEventListener("click", (e) => {
    formDialog.close();
});

const bookForm = document.querySelector("#bookForm");

bookForm.addEventListener("submit", (e) => {
    const bookName = document.querySelector("#name").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    let book = new Book(bookName, author, pages);
    addBookToLibrary(book);
    console.log(myLibrary);
});

