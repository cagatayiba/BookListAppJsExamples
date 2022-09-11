//Book Class : Represents a book
class Book{
    constructor(title , author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI Class 
class UI{
    static displayBooks(){
       
        const books = Store.getBooks();
        books.forEach((book) => {
            UI.addBookToList(book)
        });
    }
    static addBookToList(book){
        const list = document.querySelector('#bookList');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-small delete">X</a></td>
        `
        list.appendChild(row);
    }

    static clearFields(){
        const controls = document.querySelectorAll('.form-control');
        controls.forEach(control => control.value='')

    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
            return 1;
        }
        return 0;
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#bookForm');
        container.insertBefore(div, form);    
        // vanish in three seconds
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }

    
}

//stores class
class Store{
    static getBooks(){
        let books = localStorage.getItem('books');
        if(books === null){
            books = [];
        }else{
            books= JSON.parse(books);
        }
        return books;
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book,index) =>{
            if(book.isbn == isbn){
                books.splice(index,1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));

    }

}

//Event : Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event : Add Book
document.querySelector('#bookForm').addEventListener('submit', e =>{
    e.preventDefault();
    console.log("inside the function");

    // get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //check fields
    if(title == '' || author == '' || isbn==''){
        UI.showAlert('please fill all the fields', 'danger');
        return;
    }

    //Instantiate Book
    const book = new Book(title,author,isbn);

    UI.addBookToList(book);

    Store.addBook(book);

    UI.showAlert('book is added successfully', 'success');

    UI.clearFields();



})

// event remove a book
document.querySelector('#bookList').addEventListener('click', e => {
    let res = UI.deleteBook(e.target);
    if(res === 1){
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
        UI.showAlert('book is deleted', 'success');
    }
    
});

