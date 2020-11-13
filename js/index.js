// defined variables

const BOOKS_URL = `http://localhost:3000/books`;
const booksList = qs("#list");
const showPanel = qs("#show-panel");

// defined functions 

function ce(element){
    return document.createElement(element)
}

function qs(selector){
    return document.querySelector(selector)
}

function handleLikeButton(event){
    // make the LI tag signifying that pouros user 1 liked the book
    const myLI = ce("li")
    myLI.innerText = "pouros"
    myLI.dataset.id = 1
    event.target.previousElementSibling.append(myLI)
    // find the book id
    const bookID = parseInt(event.target.dataset.id)
    const userCollection = Array.from(event.target.previousElementSibling.children)
    const usersArray = [];
    userCollection.forEach(user => {
        // id
        // username
        // assemble an array of objects
        const userObject = {
            id: parseInt(user.dataset.id),
            username: user.innerText
        }
        usersArray.push(userObject)
    })
    // add our user to this array
    const myUserInfo = {
        "id": 1,
        "username": "pouros"
    }
    usersArray.push(myUserInfo)

    const bodyData = {
        "users": usersArray
    }
    // assemble request object
    const reqObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(bodyData)
    }
    // create a PATCH fetch request
    fetch(BOOKS_URL + '/' + bookID, reqObj)
        .then(resp => resp.json())
        .then(data => console.log(data))
}

function handleBookShow(bookObj){
    // render this book data in the show-panel
    // create an element for each of the book's attributes
    showPanel.innerHTML = ""
    // rendering the title
    const titleH1 = ce("h1")
    titleH1.innerText = bookObj.title
    
    // render the image
    const bookImage = ce("img")
    bookImage.src = `${bookObj.img_url}`
    
    // render subtitle
    const subtitleH3 = ce("h3")
    subtitleH3.innerText = bookObj.subtitle

    // render author
    const authorH2 = ce("h2")
    authorH2.innerText = bookObj.author

    // render description
    const descriptionP = ce("p")
    descriptionP.innerText = bookObj.description


    // render the users that liked this book
    // make a UL for all users
    const usersList = ce("ul")
    // for each user
    bookObj.users.forEach(user => {
        // create an LI tag
        const userLI = ce("li")
        // make the innerText = user name
        userLI.innerText = user.username
        // put the user id on the element as data-id
        userLI.dataset.id = user.id
        // append that LI to the UL
        usersList.append(userLI)
    })

    // create a button
    const likeButton = ce("button")
    // the button will have text that says "like this book"
    likeButton.innerText = "Like this Book"
    // we will put this books ID on the button as a data-id attribute
    likeButton.dataset.id = bookObj.id
    // make functionality to handle clicking that button
    likeButton.addEventListener("click", handleLikeButton)


    // append those elements to the show-panel
    showPanel.append(titleH1, bookImage)
    showPanel.append(subtitleH3, authorH2, descriptionP, usersList, likeButton)

    
} 

function handleBookFetch(event){
    // make fetch request to that 1 specific book we clicked on
    const bookID = parseInt(event.target.dataset.id)
    // fetch this book
    fetch(BOOKS_URL + "/" + bookID)
        .then(resp => resp.json())
        .then(data => handleBookShow(data))
}


function renderBooks(booksArray) {
    booksArray.forEach(book => {
        // create a LI for each of the books
        const bookLI = document.createElement("li")
        bookLI.innerText = book.title
        bookLI.dataset.id = book.id
        bookLI.addEventListener("click", handleBookFetch)
        // append that LI to the unordered list
        booksList.append(bookLI)
    })
}

// first thing - fetch the books
function fetchBooks(){
    fetch(BOOKS_URL)
    .then(res => res.json())
    .then(data => renderBooks(data))
    .catch(err => console.log(err))
} 

// invoked functions 
fetchBooks()
