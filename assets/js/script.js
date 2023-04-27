const ownedBooks = document.querySelector('.section-books');
const readingBooks = document.querySelector('.reading-books');
const readedBooks = document.querySelector('.readed-books');
const zoneTitleBooks = document.getElementById('zone_title_books');
const zoneTitleDone = document.getElementById('zone_title_done');
const btnAddBook = document.getElementById('btn_add_books');
const formsAddBookContainer = document.querySelector('.add_book_container');
const formsAddBook = document.querySelector('#add_book_form');
const resultMessages = document.querySelector('#result_messages');
const coverBook = document.getElementById('cover');
let books = [];
let reading = [];
let done = [];


btnAddBook.addEventListener("click", function addBook() {
    formsAddBookContainer.style.display = "block";
});

formsAddBook.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let title = document.getElementById('title');
    let author = document.getElementById('author');
    let pages = document.getElementById('pages');
    let cover = document.getElementById('cover');
    
    books.push({
        book_id: (Math.floor(Math.random()*100)).toString(),
        book_title: title.value,
        book_author: author.value,
        book_pages: pages.value,
        book_cover: cover.files[0],
    })
    
    formsAddBookContainer.style.display = "none";
    resultMessages.style.display = "block";
    
    resultMessages.innerHTML = 
    `<div class="main_title alert alert-success" role="alert">
            New book <strong>${title.value}</strong> added
        </div>`;
    ownedBooks.innerHTML = ''

    generateBookList(books);

    title.value = '';
    author.value = '';
    pages.value = '';
    cover.value = '';

    setTimeout(function() {
        resultMessages.style.display = 'none';
    }, 3000);
});


function generateBookList(books) {
    for(let book of books) {
        let fr = new FileReader();
        fr.readAsDataURL(book.book_cover);
        fr.onload = function(e) {
            ownedBooks.innerHTML += `<img class="book" src=${e.target.result} alt=${book.book_title} draggable="true" ondragstart="drag(event)" id=${book.book_id}>`
        }
    }
}

if (books.length != 0) zoneTitleBooks.innerText = `Books ${books.length}`;


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
  
function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    if(ev.target.id == "section-books") {
        ownedBooks.appendChild(document.getElementById(data));
        reading.splice(0, 1);
        done.shift();
        zoneTitleDone.innerText = `Done ${done.length}`;
    } else if(ev.target.id == "reading-books" && reading.length === 0){
        readingBooks.appendChild(document.getElementById(data));
        reading.push(books[parseInt(data)]);
        if(done.length > 0) done.shift();
        zoneTitleDone.innerText = `Done ${done.length}`;
    } else if(ev.target.id == "readed-books"){
        readedBooks.appendChild(document.getElementById(data));
        done.push(books[parseInt(data)]);
        zoneTitleDone.innerText = `Done ${done.length}`;
        reading.splice(0, 1);
    }
}


// onload = () => {
//     book.ondragstart = (e) => {
//         // e.dataTransfer.setData("text/plain", book.id);
//         e.dataTransfer.setData("text/plain", e.target.id);
//     }
// }

// for (const inZone of document.querySelectorAll('.zone')) {    
//     inZone.ondragover = (e) => {
//         e.preventDefault();
//         inZone.classList.add('zona-over');
//     }
//     inZone.ondragleave = (e) => {
//         e.preventDefault();
//         inZone.classList.remove('zona-over');
//     }

//     inZone.ondrop = (e) => {
//         e.preventDefault();
//         const id = e.dataTransfer.getData("text/plain");
//         const elem = document.getElementById(id);
//         // inZone.appendChild(elem);
//         e.target.appendChild(elem);
//         inZone.classList.remove('zona-over');
//     }
// }