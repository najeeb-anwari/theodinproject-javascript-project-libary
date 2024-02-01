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
let bookIdCounter = 1;
bookForm.addEventListener("submit", (e) => {
    
    const bookName = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    let book = new Book(bookName, author, pages);
    book.id = bookIdCounter++;
    addBookToLibrary(book);
    booksContainer.innerHTML = ``;
    myLibrary.forEach(book => {
        const bookCard = `
        <div class="card book-item">
            <div class="card-content">
                
                <h2>Title: ${book.title}</h2>
                
                <div class="book-field">
                    <label for="author">Author:</label>
                    <span>${book.author}</span>
                </div>

                <div class="book-field">
                    <label for="pages">Pages:</label>
                    <span>${book.pages}</span>
                </div>

                <div class="book-field">
                    <label for="pages">Status:</label>
                    <span class="book-status">${book.read ? "Read" : "Not Read Yet"}</span>
                </div>
                    
                <hr/>
                <button class="btn btn-sm btn-primary readToggle" data-id="${book.id}">${book.read ? "Mark as Unread" : "Mark as Read" }</button>
                    
            </div>
        </div>
        `;
        booksContainer.innerHTML += bookCard;
    });
    const readToggleBtns = document.querySelectorAll(".readToggle");
    readToggleBtns.forEach((readToggleBtn) => {
        readToggleBtn.addEventListener("click", (f) => {
            const id = f.target.getAttribute("data-id");
            const book = myLibrary.filter(b => b.id == id)[0];
            book.toggleRead();
            const bookStatus = book.read ? "Read" : "Not Read Yet";
            readToggleBtn.innerHTML = book.read ? "Mark as Unread" : "Mark as Read";
            const bookStatusElement = f.target.parentNode.querySelector(".book-status");
            bookStatusElement.innerHTML = bookStatus;
        });
    });
});


