export function Book(title, author, pages) {
    this.id = 0;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
    this.toggleRead = function() {
        this.read = !this.read;
    }
}

