const baseUrl = 'http://localhost:3030/jsonstore/collections/books';
const loadBooksBtn = document.getElementById('loadBooks');
const tbody = document.querySelector('tbody');
const createForm = document.querySelector('form');
const submitBtn = createForm.querySelector('button');
const body = document.querySelector('body');
loadBooksBtn.addEventListener('click', getBooks)
submitBtn.addEventListener('click', createBook)

const editForm = document.createElement('form');
editForm.innerHTML = `
    <h3>Edit FORM</h3>
    <label>TITLE</label>
    <input type="text" name="title" id="editTitle">
    <label>AUTHOR</label>
    <input type="text" name="author" id = "editAuthor">
    <button>Save</button>`
const saveBtn = editForm.querySelector('button');




async function getBooks(event) {
    const request = await fetch(baseUrl)
    if (!request.ok) {
        const error = await request.json();
        alert(error.message);
        throw new Error(error.message);
    }
    const data = await request.json();
    tbody.innerHTML = ''
    Object.entries(data).forEach(([id, obj]) => {
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>${obj.title}</td>
        <td>${obj.author}</td>
        <td>
            <button name=${id} id="edit">Edit</button>
            <button name=${id} id="delete">Delete</button>
        </td>
    `
        const editBtn = row.querySelectorAll('button')[0]
        const deleteBtn = row.querySelectorAll('button')[1]
        editBtn.addEventListener('click', updateBook);
        deleteBtn.addEventListener('click', onDelete);
        tbody.appendChild(row)
    });

}
async function createBook(event) {
    event.preventDefault()
    const formData = new FormData(createForm);
    const title = formData.get('title')
    const author = formData.get('author')
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: author, title: title })
    });
    if (!response.ok) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }
    createForm.reset();
    getBooks()

}
async function updateBook(event) {
    const id = event.target.name
    const title = event.target.parentElement.parentElement.children[0].textContent
    const author = event.target.parentElement.parentElement.children[1].textContent
    body.replaceChild(editForm, createForm)
    saveBtn.addEventListener('click', onSave);
    const titleInp = document.getElementById('editTitle');
    const authorInp = document.getElementById('editAuthor');
    titleInp.value = title;
    authorInp.value = author;
    async function onSave(event) {
        event.preventDefault();
        const form = event.target.parentElement
        const formData = new FormData(form);
        const author = formData.get('author');
        const title = formData.get('title');
        const request = await fetch(`${baseUrl}/` + id, {
            method: 'Put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ author: author, title: title })
        })
        if (!request.ok) {
            const error = await request.json();
            alert(error.message);
            throw new Error(error.message);
        }
        form.reset();
        getBooks()
        body.replaceChild(createForm, editForm)
    }
}

async function onDelete(event) {
    const id = event.target.name
    const request = await fetch(`${baseUrl}/` + id, {
        method: 'DELETE',
    });
    if(!request.ok){
        const error = await response.json();
        throw new Error(error.message);
    }
    getBooks()

}