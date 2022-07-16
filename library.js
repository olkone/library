let myLibrary = [
    {title: 'First Book', author: 'First Author', genre: 'adventure', pages: '123', status: 'on'},
    {title: 'Second Book', author: 'Second Author', genre: 'childrens', pages: '234'},
    {title: 'Third Book', author: 'Third Author', genre: 'comedy', pages: '345', status: 'on'},
    {title: 'Fourth Book', author: 'Fourth Author', genre: 'drama', pages: '456'},

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

function displayBooks() {
    const cardContainer = document.querySelector('#card-container');

    for (let entry of myLibrary) {
        const newCard = document.createElement('div');
        newCard.classList.add("card");

        Object.values(entry).forEach((value) => {
            let p = document.createElement('p');
            p.innerText = value;
            newCard.appendChild(p); 
        });
        cardContainer.appendChild(newCard);
    }
}

// TODO:
// Add check array for duplicates function
// Capitalize, trim white space on entries