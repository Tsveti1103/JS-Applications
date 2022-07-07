async function lockedProfile() {
    const main = document.getElementById('main')
    main.innerHTML = ''
    try{
        const baseUrl = `http://localhost:3030/jsonstore/advanced/profiles`
        let response = await fetch(baseUrl);
        if (!response.ok) {
            throw new Error('Error')
        }
        let data = await response.json();
        console.log(data)
        for(let d in data) {
            let username = data[d]['username']
            let email = data[d]['email']
            let age = data[d]['age']
            let div = document.createElement('div')
            div.className = 'profile';

            div.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
            <label>Lock</label>
            <input type="radio" name="user1Locked" value="lock" checked>
            <label>Unlock</label>
            <input type="radio" name="user1Locked" value="unlock"><br>
            <hr>
            <label>Username</label>
            <input type="text" name="user1Username" value=${username} disabled readonly />
            <div class="user1Username">
                <hr>
                <label>Email:</label>
                <input type="email" name="user1Email" value=${email} disabled readonly />
                <label>Age:</label>
                <input type="text" name="user1Age" value=${age} disabled readonly />
            </div>
            
            <button>Show more</button>`
            let hide = div.querySelector(`.user1Username`);
            hide.style.display = 'none'
            main.appendChild(div)
            let showBtn = div.querySelector('button')
            showBtn.addEventListener('click',showData)
            function showData(event){
                let currentBtn = event.target
                let lock = currentBtn.parentElement.children[2]
                if(lock.checked){
                    return
                }
                if(currentBtn.textContent=='Show more'){
                    currentBtn.textContent = 'Hide it'
                    currentBtn.previousElementSibling.style.display = 'inline'
                }
                else{
                    currentBtn.textContent = 'Show more'
                    currentBtn.previousElementSibling.style.display = 'none'
                }


            }
        }
    }catch(err){
        console.log(err)
    }

}