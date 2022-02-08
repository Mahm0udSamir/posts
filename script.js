// form stop loading
const form = document.getElementById("subscribeForm");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

// Add height to posts
const bodyHeight = document.querySelector('body').offsetHeight;
const formHeight = document.querySelector('.subscribeBox').offsetHeight;
const postsContainerEl = document.querySelector('#posts-container');
postsContainerEl.style.height = bodyHeight-formHeight-30;

// get all data
const getPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        data.map((item) => {
            post(item.title, item.body);
        })
    });
}

// post data
const addPost = () => {
    const title = document.getElementById('post-title').value || '';
    const body = document.getElementById('post-body').value || '';
    if(!title.trim() && !body.trim()) return;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            body,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((data => post(data.title, data.body)));
}

// container
const post = (title, body) => {
    const posts = document.getElementById('posts');
    posts.insertAdjacentHTML('afterend',`
            <div class="card">
                <div class="container">
                    <h4><b>${title}</b></h4>
                    <p>${body}</p>
                </div>
            </div>`);
};

 


(() => {
    getPosts();
})();
