let myLibrary = [];

function Book(title, author, genre, pages, status) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.status = status;
}

const sortBy = document.getElementById("sort-by");
const addBookBtn = document.getElementById("add-book-btn");

const modal = document.getElementById("modal");
const modalCloseBtn = document.getElementById("modal-close");
const modalTitle = document.getElementById("title");

const editModal = document.getElementById("edit-modal");
const editCloseBtn = document.getElementById("edit-modal-close");

const cardDeleteBtns = document.getElementsByClassName(".card-delete");
const cardEditBtns = document.getElementsByClassName(".card-edit");


let id = -1;
let index = -1;

function addBook() {
    id += 1;
    const formData = new FormData(modal);
    const formProps = Object.fromEntries(formData);
    
    formProps.id = id;
    myLibrary.push(formProps);
}

function displayNewBook() {
    index += 1;
    const cardContainer = document.querySelector('#card-container');
    const lastEntry = myLibrary.slice(-1)[0];
    const newCard = document.createElement('div');
    const delBtn = createCardButton('delete', index);
    const editBtn = createCardButton('edit', index);
    const btnContainer = document.createElement('div');

    newCard.classList.add("card");
    newCard.setAttribute("data-id", index);

    createCardContent(lastEntry, newCard);
    
    createButtonContainer(btnContainer, editBtn, delBtn, newCard);

    cardContainer.appendChild(newCard);
}

function createCardContent(lastEntry, newCard) {
    let nth = 0;
    Object.values(lastEntry).forEach((value) => {
        nth += 1;
        let p = document.createElement('p');
        p.innerText = value;
        p.setAttribute('class', `id${lastEntry.id} p${nth}`);
        newCard.appendChild(p); 
    });
}

function createCardButton(name, index) {
    const newButton = document.createElement('button');

    newButton.innerHTML = `${name}`;
    newButton.classList.add(`card-${name}`);
    newButton.setAttribute('data-id', index);

    return newButton;
}

function createButtonContainer(newDiv, btn1, btn2, container) {
    newDiv.appendChild(btn1);
    newDiv.appendChild(btn2);
    container.appendChild(newDiv);
}

function deleteCard(id) {
    const card = document.querySelector(`.card[data-id="${id}"]`);
    const cardId = card.getAttribute('data-id');

    const bookIndex = myLibrary.findIndex(book => {
        return book.id == id;
    });

    myLibrary.splice(bookIndex, 1);
    card.style.display = "none";
}

function editCard(id) {
    const book = myLibrary[id];
    const title = document.querySelector(`.id${id}` + '.p1');
    const author = document.querySelector(`.id${id}` + '.p2');
    const genre = document.querySelector(`.id${id}` + '.p3');
    const pages = document.querySelector(`.id${id}` + '.p4');
    
    title.innerText = book.title;
    author.innerText = book.author;
    genre.innerText = book.genre;
    pages.innerText = book.pages;

    editModal.style.display = "none";
}

function editLibrary(id) {

    const book = myLibrary[id];
    const title = document.querySelector("#edit-title");
    const author = document.querySelector("#edit-author");
    const genre = document.querySelector("#edit-genre");
    const pages = document.querySelector("#edit-pages");

    book.title = title.value;
    book.author = author.value;
    book.genre = genre.value;
    book.pages = pages.value;
}

function clearForm(form) {

    const thisForm = document.getElementById(`${form}`);
    const children = thisForm.childNodes;
    children.forEach((child) => {
        child.value = '';
    });

    const radioBtns = document.querySelector(".radio-btns").childNodes;
    radioBtns.forEach(button => {
        button.checked = false;
    });
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

document.addEventListener('click', (e) => {
    let id = e.target.getAttribute('data-id');

    if (e.target.classList.contains('card-delete')) {
        deleteCard(id);
    } else if (e.target.classList.contains('card-edit')) {
        let cardId = e.target.getAttribute('data-id');
        editModal.style.display = "grid";

        editModal.onsubmit = () => {
            editLibrary(cardId);
            editCard(cardId);
            clearForm('edit-modal');
            return false;
        };
    }
});

addBookBtn.onclick = () => {
    modal.style.display = "grid";
    modalTitle.focus();
}

modalCloseBtn.onclick = () => {
    modal.style.display = "none";
}


editCloseBtn.onclick = () => {
    editModal.style.display = "none";
}

modal.onsubmit = () => {
    addBook();
    displayNewBook();
    clearForm('modal');
    modal.style.display = "none";
    return false;
}

// Chage card layout on sort-by selection
sortBy.addEventListener('change', () => {
    //createCards(myLibrary.slice(0).sort(sortByProp(sortBy.value)));
    return;
});

// TODO:
// Add check array for duplicates function
// Trim white space on entries
// Figure out how to sort cards without destroying/recreating them