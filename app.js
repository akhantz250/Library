let myLibrary = [];

function Book(title, author, pages, read,fav){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.fav =false
}

function addBookToLibrary(title, author, pages,  read, library){
    let book = new Book(title, author, pages, read)
    library.push(book)
    let index = library.length-1;
    addCardToContainer(book, index);
    updateInfo();
}

const form = document.getElementById('new-book');
const container = document.querySelector('.card-container');

form.addEventListener('submit',(e) =>{
    e.preventDefault();
    const author = form.elements['author'];
    const title = form.elements['title'];
    const pages = form.elements['pages']
    const read = form.elements['read']
    let readVal;
    if(read.checked){
        readVal = true;
    }else{
        readVal = false;
    }
    let authorVal = author.value;
    let titleVal = title.value;
    let pagesVal = pages.value;
    addBookToLibrary(titleVal, authorVal, pagesVal, readVal, myLibrary);
})

function addCardToContainer(bookObj, index){
    const newBook = document.createElement('div');
    newBook.setAttribute('data-index',index);
    newBook.classList.add('card');
    container.appendChild(newBook);

    const title = document.createElement('p');
    title.textContent = `"${bookObj.title}"`;
    const author = document.createElement('p');
    author.textContent = bookObj.author;
    const pages = document.createElement('p');
    pages.textContent = `${bookObj.pages} pages`;
    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);

    // adds the buttons

    const btnDiv = document.createElement('div');
    btnDiv.classList.add('button-container');
    
    btnDiv.innerHTML = `<span class="btn-label">Mark as read</span>
    <label class="switch">
    <input type="checkbox">
    <span class="slider round"></span>
    </label>
    <button class="btn1"><span class="star material-symbols-outlined icon md-24">grade</span></button>
    <button class="btn2"><span class="material-symbols-outlined icon red600 md-24">delete</span></button>`

    newBook.appendChild(btnDiv);
    const checkbox = btnDiv.querySelector(`input[type="checkbox"]`);
    if(bookObj.read === true){
        checkbox.checked = true
    }
    checkbox.addEventListener('change', (e) =>{
        if(checkbox.checked){
            myLibrary[index].read = true;
        }
        else{
            myLibrary[index].read = false;
        }
        updateInfo(); 
    });
    const star = btnDiv.querySelector('.star');
    if(myLibrary[index].fav === true){
        star.classList.add('favourite');
    }
    star.addEventListener('click', (e) => {e.target.classList.toggle('favourite');
    if(myLibrary[index].fav === true) myLibrary[index].fav =false;
    else myLibrary[index].fav = true;
    updateInfo();
    });
    const deleteBook = btnDiv.querySelector('.btn2');
    deleteBook.addEventListener('click',() => removeBook(index))
    form.reset();
}
function loadBooks(array){
    const container = document.querySelector('.card-container')
    while (container.firstChild) {
        container.removeChild(container.lastChild);
      }
    for(let i=0;i<array.length; i++){
        addCardToContainer(array[i],i);
    }
    updateInfo();
    
}
function removeBook(index){
    myLibrary.splice(index, 1);
    loadBooks(myLibrary);
}

const totalBooks = document.getElementById('total-books');
const readBooks = document.getElementById('read-books');
const favBooks = document.getElementById('fav-books');

function updateInfo(){
    let total = myLibrary.length, read = 0, fav =0;
    for(let i =0; i<myLibrary.length; i++){
        if(myLibrary[i].read === true) read++;
        if(myLibrary[i].fav === true) fav++;
    }
    totalBooks.textContent = `Books: ${total}`;
    readBooks.textContent = `Read: ${read}`;
    favBooks.textContent = `Favourites: ${fav}`;
}


