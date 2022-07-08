function attachEvents() {
    document.getElementById('refresh').addEventListener('click', onRefresh);
    document.getElementById('submit').addEventListener('click', onSubmit);
    let url = 'http://localhost:3030/jsonstore/messenger'
    const textArea = document.getElementById('messages')
    async function onRefresh(event) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error);
            }
            const data = await response.json();
            let comments = []
            Object.values(data).forEach(message => {
                comments.push(`${message.author}: ${message.content}`)
            });
            textArea.textContent = comments.join('\n');
        } catch (err) {
            alert(err.message);
        }
    }
    async function onSubmit(event) {
        const authorName = document.querySelector('[name="author"]');
        const msgText = document.querySelector('[name="content"]');
        try {
            if (!authorName.value || !msgText.value) {
                throw new Error('Invalid author name or content')
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    author: authorName.value.trim(),
                    content: msgText.value.trim()
                })
            });
            if(!response.ok){
                const error = await response.json()
                throw new Error(error)
            }

        }catch (err) {
           alert(err.message)
        }

        authorName.value='';
        msgText.value='';
    }
}

attachEvents();