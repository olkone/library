let myLibrary = [
    {title: 'First Title', author: 'Brad Brad', genre: 'adventure', pages: '123'},
    {title: 'Second Title', author: 'Dig Dub', genre: 'childrens', pages: '234'},
    {title: 'Third Title', author: 'Georgia Gold', genre: 'comedy', pages: '345'},
    {title: 'Fourth Title', author: 'Alma Aaron', genre: 'drama', pages: '456'},
    {title: 'Really Super Long Fifth Title', author: 'Carter Cat', genre: 'adventure', pages: '123'},
    {title: 'Realy Extra Super Duper Long Title: The Sixth', author: 'EE', genre: 'childrens', pages: '234'},
    {title: 'Seven', author: 'Helen Hunter', genre: 'comedy', pages: '345'},
    {title: 'This is the Eighth Book', author: 'Frankie Freallylonglastname', genre: 'drama', pages: '456'},
];

const cardContainer = document.querySelector('#card-container');
const cards = document.querySelectorAll(".card");
const sortBy = document.getElementById("sort-by");
const modal = document.getElementById("modal");

const addBookBtn = document.getElementById("add-book-btn");
const ModalCloseBtn = document.getElementById("modal-close");
const cardCloseBtns = document.getElementsByClassName(".card-close");
const modalTitle = document.getElementById("title");

function Book(title, author, genre, pages, status) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.status = status;
}

let id = -1;

function addBook() {
    const formData = new FormData(document.querySelector("form"));
    const formProps = Object.fromEntries(formData);
    
    id += 1;
    formProps.id = id;
    myLibrary.push(formProps);
}

let index = -1;

function displayNewBook() {
    index += 1;
    const lastEntry = myLibrary.slice(-1)[0];
    const newCard = document.createElement('div');
    
    newCard.classList.add("card");
    newCard.setAttribute("data-id", index);

    // Create a <p> tag for each value
    Object.values(lastEntry).forEach((value) => {
        let p = document.createElement('p');
        p.innerText = value;
        newCard.appendChild(p); 
    });

    // Create tag for close button  
    let closeBtn = document.createElement('button');
    closeBtn.innerHTML = 'remove';
    closeBtn.classList.add("card-close");
    closeBtn.setAttribute('data-id', index);
    newCard.appendChild(closeBtn);

    cardContainer.appendChild(newCard);
}

function createCards(library) { // delete after testing
    cardContainer.innerHTML = ''

    for (item of library) {
        index += 1;
        const newCard = document.createElement('div');
        newCard.classList.add("card");
        newCard.setAttribute('data-id', index);

        // Create a <p> tag for each value
        Object.values(item).forEach((value) => {
            let p = document.createElement('p');
            p.innerText = value;
            newCard.appendChild(p);

            return newCard;
        });

        // Create tag for close button  
        let closeBtn = document.createElement('button');
        closeBtn.innerHTML = 'remove';
        closeBtn.classList.add("card-close");
        closeBtn.setAttribute('data-id', index);

        newCard.appendChild(closeBtn);

        cardContainer.appendChild(newCard);
    }
}

function deleteCard(id) {
    // Deletes the card and library index with same ID
    let card = document.querySelector(`[data-id= '${id}']`);

    myLibrary.splice(id, 1);
    card.style.display = "none";

}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('card-close')) {
        deleteCard(e.target.getAttribute('data-id'));
    }
});

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

addBookBtn.onclick = () => {
    modal.style.display = "grid";
    modalTitle.focus();
}

ModalCloseBtn.onclick = () => {
    modal.style.display = "none";
}

modal.onsubmit = () => {
    addBook();
    displayNewBook();
    modal.style.display = "none"
    return false;
}

// Chage card layout on sort-by selection
sortBy.addEventListener('change', () => {
    createCards(myLibrary.slice(0).sort(sortByProp(sortBy.value)));
});

window.onload(createCards(myLibrary)); // Remove after styling/testing


// TODO:
// Add check array for duplicates function
// Capitalize, trim white space on entries
// Figure out how to sort cards without destroying/recreating them