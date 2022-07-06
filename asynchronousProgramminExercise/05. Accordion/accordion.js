async function solution() {
    try {
        let url = `http://localhost:3030/jsonstore/advanced/articles/list`
        let response = await fetch(url);
        console.log(response)
        if (!response.ok) {
            throw new Error('Error obtaining article details')
        }

        let data = await response.json();
        console.log(data)

        data.forEach(article => {
            let articleEl = document.createElement('div');
            articleEl.classList.add('accordion')
            articleEl.innerHTML =
                `
            <div class="head">
                <span>${article.title}</span>
                <button class="button" id="${article._id}" onclick="moreOnClock(event)">More</button>
            </div>
            <div class="extra"></div>
            `
            let main = document.getElementById('main');
            main.appendChild(articleEl);
        })
    } catch (err) {
        console.log(err)
    }
}

async function moreOnClock(event) {
    try {
        let currentTarget = event.currentTarget;
        let url = `http://localhost:3030/jsonstore/advanced/articles/details/${currentTarget.id}`
        let parent = currentTarget.parentElement.parentElement;
        let extraDiv = parent.querySelector('div.extra');
        let response = await fetch(url)

        if (!response.ok) {
            throw new Error('Error obtaining article details')
        }
        let data = await response.json()
        extraDiv.innerHTML = `<p>${data.content}</p>`
        if(currentTarget.textContent == "More"){
            currentTarget.textContent = "Less"
            extraDiv.style.display = "block"
        }else{
            currentTarget.textContent = "More"
            extraDiv.style.display = "none"
        }
    } catch (err) {
        console.log(err)
    }
}
solution()