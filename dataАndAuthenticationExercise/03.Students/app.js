const baseUrl = 'http://localhost:3030/jsonstore/collections/students';
const table = document.querySelector('#results tbody');
const form = document.querySelector('form')

window.addEventListener('load', loadStudents);
form.addEventListener('submit', addStudent);

function createElement(type, ...content) {
    let el = document.createElement(type);
    content.forEach(c => {
        if (typeof c == 'string' || typeof c === 'number') {
            c = document.createTextNode(c);
        }
        el.appendChild(c)
    })
    return el;
}
async function loadStudents() {
    try {
        const response = await fetch(baseUrl)
        const data = await response.json();
        table.replaceChildren()
        if (!response.ok) {
            throw new Error(data.message);
        }
        Object.values(data).forEach(record => {
            const student = createElement('tr',
                createElement('td', record.firstName),
                createElement('td', record.lastName),
                createElement('td', record.facultyNumber),
                createElement('td', record.grade)
            )
            table.appendChild(student)
        })
    } catch (err) {
        alert(err.message)
    }
}

async function addStudent(ev) {
    ev.preventDefault();
    // this don't work:
    // const fName = document.querySelector('[name="firstName"]');
    // const lName = document.querySelector('[name="lastName"]');
    // const fNumber = document.querySelector('[name="facultyNumber"]');
    // const grade = document.querySelector('[name="grade"]');
    const formData = new FormData(form);
    const infoArr = [...formData.values()];
    const fName = infoArr[0];
    const lName = infoArr[1];
    const fNumber = infoArr[2];
    const grade = infoArr[3];

    try {
        if (!fName || !lName || !fNumber || !grade) {
            throw new Error('All fields must be filled')
        }
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName: fName, lastName: lName, facultyNumber: fNumber, grade: grade })
        })
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        loadStudents()
    } catch (err) {
        alert(err.message);
    }


}