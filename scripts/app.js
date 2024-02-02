import { Book } from './library.js'

const myLibrary = [];

let bookIdCounter = 1;




// Get DOM elements
const booksContainer = document.querySelector(".books-container");
const addToBookBtn = document.querySelector(".open-dialog-btn");
const closeDialogBtn = document.querySelector(".close-dialog-btn");
const formDialog = document.querySelector(".form-dialog");
const bookForm = document.querySelector("#bookForm");


// Event listeners
addToBookBtn.addEventListener("click", openFormDialog);
closeDialogBtn.addEventListener("click", closeFormDialog);
bookForm.addEventListener("submit", handleFormSubmit);
booksContainer.addEventListener("click", handleReadToggle);
booksContainer.addEventListener("click", handleDeleteBook);

// Open the form dialog
function openFormDialog() {
    formDialog.showModal();
}

// Close the form dialog
function closeFormDialog() {
    formDialog.close();
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    const bookName = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const book = new Book(bookName, author, pages);
    book.id = bookIdCounter++;
    addBookToLibrary(book);
    renderBooks();
    resetForm();
}

// Add book to the library array
function addBookToLibrary(book) {
    myLibrary.push(book);
}

// Render all books in the library
function renderBooks() {
    booksContainer.innerHTML = '';
    myLibrary.forEach(renderBook);
}

// Render a single book
function renderBook(book) {
    const bookCard = createBookCard(book);
    booksContainer.insertAdjacentHTML('beforeend', bookCard);
}

// Create HTML for a book card
function createBookCard(book) {
    return `
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
                <button class="btn btn-primary btn-sm readToggle" data-id="${book.id}">
                    ${book.read ? "Mark as Unread" : "Mark as Read"}
                </button>

                <button class="btn btn-danger btn-sm deleteBook" data-id="${book.id}">
                    Delete
                </button>
            </div>
        </div>
    `;
}

// Handle toggling of book status
function handleReadToggle(event) {
    const toggleBtn = event.target.closest('.readToggle');
    if (toggleBtn) {
        const bookId = toggleBtn.dataset.id;
        const book = myLibrary.find(book => book.id == bookId);
        if (book) {
            book.toggleRead();
            renderBooks();
        }
    }
}

// Handle delete book
function handleDeleteBook(event) {
    const deleteBtn = event.target.closest('.deleteBook');
    if (deleteBtn) {
        const bookId = +deleteBtn.dataset.id;
        const bookIndex = myLibrary.findIndex(book => book.id === bookId);
        if (bookIndex !== -1) {
            myLibrary.splice(bookIndex, 1);
            const bookCard = deleteBtn.closest('.book-item');
            if (bookCard) {
                bookCard.remove();
            }
        }
    }
}

// Reset form after submission
function resetForm() {
    bookForm.reset();
}



