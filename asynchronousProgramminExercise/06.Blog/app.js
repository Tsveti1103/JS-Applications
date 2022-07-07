function attachEvents() {
    const postUrl = `http://localhost:3030/jsonstore/blog/posts`;
    const commentsUrl = `http://localhost:3030/jsonstore/blog/comments`;
    const loadPostBtn = document.getElementById('btnLoadPosts');
    const viewPostBtn = document.getElementById('btnViewPost');
    const posts = document.getElementById('posts')

    loadPostBtn.addEventListener('click', loadPost);

    async function loadPost() {
        try {
            const response = await fetch(postUrl)
            const data = await response.json();
            Object.keys(data).forEach(key => {
                const body = data[key]['body'];
                const id = data[key]['id'];
                const title = data[key]['title']
                const opt = document.createElement('option')
                opt.value = id;
                opt.textContent = title.toUpperCase();
                posts.appendChild(opt)

            })
            viewPostBtn.addEventListener('click', viewPost);
        } catch (err) {
            console.log(err);
        }
        async function viewPost(event) {
            try {
                const postId = event.target.previousElementSibling.value;
                const postResponse = await fetch(`${postUrl}/${postId}`)
                const postData = await postResponse.json();
                document.getElementById('post-title').textContent = postData['title'];
                document.getElementById('post-body').textContent = postData['body'];
                let ulEl = document.getElementById('post-comments');
                ulEl.textContent = ''
                const response = await fetch(commentsUrl)
                const data = await response.json();

                Object.keys(data).forEach(key => {
                    const currentPostId = data[key]['postId']
                    const text = data[key]['text']
                    if(currentPostId==postId){
                        let liEl = document.createElement('li')
                        liEl.textContent = text
                        ulEl.appendChild(liEl)
                    }
                })
            } catch (err) {
                console.log(err);
            }
        }

    }

}

attachEvents();