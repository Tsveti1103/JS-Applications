function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click',onLoad);
    document.getElementById('btnCreate').addEventListener('click',onCreate);
    const name = document.getElementById('person');
    const phone = document.getElementById('phone');
    const baseUrl = 'http://localhost:3030/jsonstore/phonebook';
    const ul = document.getElementById('phonebook')
    async function onLoad(event) {
        try{
            const request = await fetch(baseUrl);
        if(!request.ok){
            const error = await request.json();
            throw new Error(error.message);
        }
        const data = await request.json();
        ul.replaceChildren();
        Object.values(data).forEach(record => {
            const liElement = document.createElement('li');
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.setAttribute('id', record._id);
            liElement.textContent = `${record.person} ${record.phone}`
            liElement.appendChild(deleteBtn);
            ul.appendChild(liElement);
            deleteBtn.addEventListener('click',onDelete)
        });
        async function onDelete(event) {
            const request = await fetch(`${baseUrl}/${event.target.id}`,{
                method: 'DELETE',
            })
            if(!request.ok){
                const error = await response.json();
                throw new Error(error.message);
            }
            onLoad()

        }
        }catch (err) {
            alert(err.message)
        }
    }
    async function onCreate(event){
        try{
            if(!name.value || !phone.value){
                throw new Error("Name and phone are required!")
            }
            const request = await fetch(baseUrl,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({person:name.value, phone:phone.value})
            })
            if(!request.ok){
                const error = await request.json();
                throw new Error(error.message);
            }
        }catch(err){
            alert(err.message);
        }
    }


}

attachEvents();