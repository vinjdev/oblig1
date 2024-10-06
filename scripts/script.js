let maxPosts = 18; 
const absoluteMax = 90; 
const postsPerPage = 3;
let page = 1; 
let isLoading = false;


async function getData() {
   
    const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${postsPerPage}`;

    try {
        isLoading = true
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }

        const data = await response.json();

        displayPosts(data);
        page++; 
        isLoading = false

    } catch (error) {
        console.error("Failed to fetch data:", error);
    }
}

function displayPosts(posts) {

    if (maxPosts >= absoluteMax) return

    const container = document.getElementById("post-container"); // gets id from only element in body
    let row;

    posts.forEach((post, index) => {
        if ((index) % postsPerPage === 0) {
            row = document.createElement("div"); // create a new row, if row is done
            row.classList.add("row");            // make 3 "rows", see css
        }

        const col = document.createElement("div"); 
        col.classList.add("col", "post");          // give it col and post properties
        col.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>`;
        row.appendChild(col);

        if ((index + 1) % postsPerPage === 0) {
            container.appendChild(row);
        }
    });
}

document.addEventListener("scroll",()=> {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight || document.documentElement.windowHeight;

    if (scrollTop + windowHeight >= scrollHeight - 10 && !isLoading && maxPosts <= absoluteMax) {
        maxPosts += 6;
        getData();
        page++
    }

})

// initial loading
for (let i = 0; i < 2; i++) {
    getData()
    page++
}

