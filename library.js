let myLibrary = [];

function Book(title, author, genre, pages, status) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.status = status;
}

const sortBy = document.getElementById("sort-by");
const modal = document.getElementById("modal");

const addBookBtn = document.getElementById("add-book-btn");
const ModalCloseBtn = document.getElementById("modal-close");
const cardDeleteBtns = document.getElementsByClassName(".card-delete");
const modalTitle = document.getElementById("title");

let id = -1;
let index = -1;

function addBook() {
    id += 1;
    const formData = new FormData(document.querySelector("form")); // Information from modal form
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
    Object.values(lastEntry).forEach((value) => {
        let p = document.createElement('p');
        p.innerText = value;
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

// Delete card and book from myLibrary
function deleteCard(id) {
    const card = document.querySelector(`.card[data-id="${id}"]`);
    const cardId = card.getAttribute('data-id');

    const bookIndex = myLibrary.findIndex(book => {
        return book.id == id;
    });

    myLibrary.splice(bookIndex, 1);
    card.style.display = "none";
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

function clearForm() {
    const children = modal.childNodes;
    children.forEach((child) => {
        child.value = '';
    });

    const radioBtns = document.getElementById("radio-btns").childNodes;
    radioBtns.forEach(button => {
        button.checked = false;
    });
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('card-delete')) {
        deleteCard(e.target.getAttribute('data-id'));
    }
});

// Add book / modal buttons

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
    clearForm();
    modal.style.display = "none";
    return false;
}

// Chage card layout on sort-by selection
sortBy.addEventListener('change', () => {
    //createCards(myLibrary.slice(0).sort(sortByProp(sortBy.value)));
    return;
});


// TODO:
// Add edit function
// Add check array for duplicates function
// Capitalize, trim white space on entries
// Figure out how to sort cards without destroying/recreating them