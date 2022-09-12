# Book List App

   Book List App takes user inputs that contains information
 about the books and then display it dynamically.

# Project Purpose

  This project is created for educational purposes. Specifically to
 practice DOM manipulation with vanilla js. Also local storage is used.

# Project Code 

  **UI Class <br />
  This class is used to manipulate DOM. For instance when addBook method is
  called the list view is updated to actually store that book data inside the
  local storage UI class uses methodes of the Store class.

  ```javascript

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



```

  **Storage class

  ```javascript

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

```

  * Note that both classes have static methods since we dont need to use
  instances of that classes

# Event Listeners

```javascript

    //Event : Display Books
// When page is loaded we go to local storage and fetch the book
// data and then dynamically display the book list
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



```

***Important Note: this project is created by following up a great tutorial made by
Travesy Media youtube channel <br />
The full tutorial video can be found via [this](https://www.youtube.com/watch?v=JaMCxVWtW58) link