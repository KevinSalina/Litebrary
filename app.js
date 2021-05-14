// Object Constructor
function Book(title, author, pages, coverImg, hasRead){
    this.title = title
    this.author = author
    this.pages = pages
    this.coverImg = coverImg
    this.hasRead = hasRead
    this.info = function(){
        return `${this.title}, ${this.pages} pages, ${hasRead ? 'read' : 'not read yet'}`
    }
}

// Save New Book To MyLibrary
function addBookToLibrary(title, author, pages, coverImg, hasRead){
    const book = new Book(title, author, pages, coverImg, hasRead)
    myLibrary.push(book)
    saveLocal()
    displayBooks()
}


// DOM Elements
const form = document.querySelector('form')
const titleInput = document.querySelector('#title')
const titleErr = document.querySelector('#title-err')
const authorInput = document.querySelector('#author')
const authorErr = document.querySelector('#author-err')
const pagesInput = document.querySelector('#pages')
const pagesErr = document.querySelector('#pages-err')
const coverInput = document.querySelector('#cover')
const coverErr = document.querySelector('#cover-err')
const hasReadInput = document.querySelector('#hasRead')
const submitBook = document.querySelector('#submitBook')
const bookGrid = document.querySelector('.book-grid')
const hasReadDisplayBtn = document.querySelector('.hasReadDisplay')
const coverInputSpan = document.querySelector('input#cover + span.label')


// CoverImage URL from label dynamic CSS
coverInput.addEventListener('keyup', ()=>{
    if(coverInput.value){
        coverInputSpan.classList.add('active')
    } else {
        coverInputSpan.classList.remove('active')
    }
})


// Form Submit and Validation
submitBook.addEventListener('click', (e)=>{
    e.preventDefault();
    if(!title.value){
        titleErr.style.display = 'block'
    } else {
        titleErr.style.display = 'none'
    }
    if(!author.value){ 
        authorErr.style.display = 'block'
    } else {
        authorErr.style.display = 'none'
    }
    if(!pagesInput.value || !pagesInput.value.match(/^\d+$/) || pagesInput.value <= 0){
        pagesErr.style.display = 'block'
        console.log(pagesInput.value.match(/^\d+$/))
    } else {
        pagesErr.style.display = 'none'
    }
    if(titleInput.value && authorInput.value && pagesInput.value && pagesInput.value > 0){
        addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, coverInput.value, hasRead.checked)
        form.reset()
        coverInputSpan.classList.remove('active')
    }  
})

// Reset all books cards and then create new card for each book in myLibrary
function displayBooks(){
    const resetBookCards = document.querySelectorAll('.book-card')
    resetBookCards.forEach(book => bookGrid.removeChild(book))
    for(book of myLibrary){
       createBookElements(book)
    }
}

function createBookElements(book){
    const bookCard = document.createElement('div')
    const bookCardTop = document.createElement('div')
    const bookCardBottom = document.createElement('div')
    const bookInfoTop = document.createElement('div')
    const bookInfoBottom = document.createElement('div')
    const bookTilteContainer = document.createElement('div')
    const bookTitle = document.createElement('p')
    const bookAuthor = document.createElement('p')
    const bookPages = document.createElement('p')
    const hasReadContainer = document.createElement('div')
    const bookDeleteContainer = document.createElement('div')
    const hasReadBtn = document.createElement('i')
    const bookDeleteBtn = document.createElement('i')
    
    bookTilteContainer.className = 'book-info-title'
    bookTitle.textContent = book.title
    bookAuthor.className = 'book-info-author'
    bookAuthor.textContent = book.author
    bookPages.className = 'book-info-pages'
    bookPages.textContent = `${book.pages} pages`
    hasReadContainer.className = 'hasReadDisplay'
    bookDeleteContainer.className = 'book-delete'
    bookDeleteBtn.className = 'fas fa-trash'
    bookCard.className = 'book-card'
    bookCard.setAttribute('data-index', myLibrary.indexOf(book))
    bookCardTop.className = 'book-card-top'
    bookCardBottom.className = 'book-card-bottom'
    bookInfoTop.className = 'book-info-top'
    bookInfoBottom.className = 'book-info-bottom'

    if(book.hasRead){
        hasReadBtn.className = 'fas fa-book-open active'
    } else {
        hasReadBtn.className = 'fas fa-book-open'
    }

    // Has Read Functionality 
    hasReadBtn.addEventListener('click', (e)=>{
        const index = myLibrary.indexOf(book)
        myLibrary[index].hasRead = !myLibrary[index].hasRead
        if(e.target.className.includes('active')){
            e.target.classList.remove('active')
            } else {
            e.target.classList.add('active')
            }
    })

    // Book Delete Functionality 
    bookDeleteBtn.addEventListener('click', (e)=>{
        const index = myLibrary.indexOf(book)
        myLibrary.splice(index,1)
        saveLocal()
        displayBooks()
    })

    // If no CoverImage URL given, give stock image
    if(book.coverImg.length){
    bookCoverImg = document.createElement('img')
    bookCoverImg.setAttribute('src', book.coverImg)
    bookCardTop.appendChild(bookCoverImg)
    } else {
    let bookCoverImg = document.createElement('i')
    bookCoverImg.className = 'fas fa-book'
    bookCardTop.appendChild(bookCoverImg)
    }

    bookTilteContainer.appendChild(bookTitle)
    bookCardTop.appendChild(bookTilteContainer)
    bookCard.appendChild(bookCardTop)
    bookInfoTop.appendChild(bookAuthor)
    bookInfoTop.appendChild(bookPages)
    hasReadContainer.appendChild(hasReadBtn)
    bookDeleteContainer.appendChild(bookDeleteBtn)
    bookInfoBottom.appendChild(hasReadContainer)
    bookInfoBottom.appendChild(bookDeleteContainer)
    bookCardBottom.appendChild(bookInfoTop)
    bookCardBottom.appendChild(bookInfoBottom)
    bookCard.appendChild(bookCardBottom)
    bookGrid.appendChild(bookCard)
}


// Local Storage
function saveLocal(){
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}
function restoreLocal(){
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'))
    if (myLibrary === null) myLibrary = [];
    displayBooks()
}

restoreLocal()





