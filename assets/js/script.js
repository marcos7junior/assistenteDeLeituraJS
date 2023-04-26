const ownedBooks = document.querySelector('.section-books');
const readingBooks = document.querySelector('.reading-books');
const readedBooks = document.querySelector('.readed-books');
const zoneTitleBooks = document.getElementById('zone_title_books');
const zoneTitleDone = document.getElementById('zone_title_done');
const btnAddBook = document.getElementById('btn_add_books');

btnAddBook.addEventListener("click", addBook);

function addBook() {
    alert("Uaaaai siiir!");
}

let books = [
    {   id: '0',
        title: 'CleanCode',
        cover: './assets/img/clear-code-cover.jpg',
    },
    {   id: '1',
        title: 'MundoDeSofia',
        cover: './assets/img/o-mundo-de-sofia.jpg',
    },
]

zoneTitleBooks.innerText = `Books ${books.length}`;

let reading = [];
let done = [];

function generateBookList(books) {
    for(let book of books) {
        ownedBooks.innerHTML += `<img class="book" src=${book.cover} alt=${book.title} draggable="true" ondragstart="drag(event)" id=${book.id}>`
    }
}

generateBookList(books);

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