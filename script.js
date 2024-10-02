let page = 1
const postPerpage = 9

async function getData() {
    const url = "https://jsonplaceholder.typicode.com/posts"
    try {
        const respone = await fetch(url)
        if (!respone.ok) {
            throw new Error(`Response status: ${respone.status}`)
        }
        
        const data = await respone.json()
        console.log(data)
        
        page++
        displayPost(data)

    } catch (error) {
        console.log(error)
    }
}

function displayPost(posts) {
    const container = document.getElementById("post")
    
}

document.addEventListener("scroll",()=> {
    getData()
})

getData()