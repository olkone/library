let myLibrary = [
    {title: '3', author: 'BB', genre: 'adventure', pages: '123', status: 'on'},
    {title: '1', author: 'DD', genre: 'childrens', pages: '234'},
    {title: '4', author: 'GG', genre: 'comedy', pages: '345', status: 'on'},
    {title: '3', author: 'AA', genre: 'drama', pages: '456'},
    {title: '3', author: 'CC', genre: 'adventure', pages: '123', status: 'on'},
    {title: '4', author: 'EE', genre: 'childrens', pages: '234'},
    {title: '1', author: 'HH', genre: 'comedy', pages: '345', status: 'on'},
    {title: '5', author: 'FF', genre: 'drama', pages: '456'},
];

function Book(title, author, genre, pages, status) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.status = status;
}

function addBook() {
    const formData = new FormData(document.querySelector("form"));
    const formProps = Object.fromEntries(formData);

    myLibrary.push(formProps);
}

function displayNewBook() {
    const cardContainer = document.querySelector('#card-container');
    const lastEntry = myLibrary.slice(-1)[0];
    const newCard = document.createElement('div');
    
    newCard.classList.add("card");

    // Create a <p> tag for each value
    Object.values(lastEntry).forEach((value) => {
        let p = document.createElement('p');
        p.innerText = value;
        newCard.appendChild(p); 
    });

    cardContainer.appendChild(newCard);
}

function createCards(library) {
    const cardContainer = document.querySelector('#card-container');
    cardContainer.innerHTML = '';

    for (item of library) {
        const newCard = document.createElement('div');
        newCard.classList.add("card");

        // Create a <p> tag for each value
        Object.values(item).forEach((value) => {
            let p = document.createElement('p');
            p.innerText = value;
            newCard.appendChild(p); 
        });

        cardContainer.appendChild(newCard);
    }
}

function sortByProp(prop) {
    let order = 1;

    if(prop[0] === "-") {
        order = -1;
        prop = prop.substr(1);
    } 

    return (a, b) => {
        let result = (a[prop] < b[prop]) ? -1 : (a[prop] > b[prop]) ? 1:0;
        return result * order;
    }
}

const modal = document.getElementById("modal");
const addBookBtn = document.getElementById("add-book-btn");
const ModalCloseBtn = document.getElementById("modal-close");

addBookBtn.onclick = () => {
    modal.style.display = "flex";
}

ModalCloseBtn.onclick = () => {
    modal.style.display = "none";
}

modal.onsubmit = () => {
    addBook();
    displayNewBook();
    return false;
}


// Chage card layout on sort-by selection
window.addEventListener('change', () => {
    const sortBy = document.getElementById("sort-by").value;

    createCards(myLibrary.slice(0).sort(sortByProp(sortBy)));
});

window.onload(createCards(myLibrary)); // Remove after styling/testing

// TODO:
// Add check array for duplicates function
// Capitalize, trim white space on entries