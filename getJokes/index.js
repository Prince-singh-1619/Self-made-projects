var API_color = 'https://random-flat-colors.vercel.app/api/random?count=5'

async function getColor(){
    const colorLoader = document.querySelector('.color-loader')
    const button = document.querySelector('.color-button')
    colorLoader.style.display = 'block'
    button.style.display = 'none'

    //color API call
    try{
        const response = await fetch(API_color)
        if(!response.ok){
            throw new Error('Color response was not ok')
        }

        //attempt to parse json
        const text = await response.text()
        //check if response is empty or invalid
        if(!text || text.trim()===""){
            throw new Error("Empty of invalid JSON response")
        }

        //parse JSON if valid
        const colorInfo = JSON.parse(text)

        // const data = await response.json()
        console.log('Color Info: ', colorInfo)
        render3ColorInfo(colorInfo.colors); 
        render2colorInfo(colorInfo.colors)
    }
    catch(err){
        console.log("Error occurred while fetching color data", err)
    }
    finally{
        colorLoader.style.display = 'none'
        button.style.display = 'block'
    }
}

function render3ColorInfo(colors){
    const container = document.querySelector(".container") 
    if(container && Array.isArray(colors) && colors.length >= 1){
        let gradient3 = `linear-gradient(to bottom right, ${colors[0]}, ${colors[1]}, ${colors[2]})`
        console.log('Applying gradient: ', gradient3);
        container.style.backgroundImage = gradient3;
    }
    else{
        console.error('Invalid 3colorInfo array: ', colors)
    }
}

function render2colorInfo(colors){
    const mainSection = document.querySelector('.main-section')
    if(mainSection && Array.isArray(colors) && colors.length>=4){
        let gradient2 = `linear-gradient(90deg, ${colors[3]}, ${colors[4]})`
        console.log('Applying gradient: ', gradient2)
        mainSection.style.backgroundImage = gradient2;
    }
    else{
        console.error('Invalid 2colorInfo array: ', colors)
    }
}

var API_joke = 'https://official-joke-api.appspot.com/random_joke'

async function getJoke(){
    const jokeLoader = document.querySelector('.joke-loader')
    const jokeButton = document.querySelector('.joke-button')
    const type = document.querySelector(".type")
    const setup = document.querySelector(".setup")
    const punch = document.querySelector(".punch")

    type.innerText = '';
    setup.innerText = '';
    punch.innerText = '';
    jokeLoader.style.display = 'block'  //show the loader
    // loader.style.
    // jokeButton.innerText = ""
    jokeButton.style.display = 'none'  //hide the content

    //joke API call
    try{
        const response = await fetch(API_joke)
        if(!response.ok){
            throw new Error('Joke response was not ok')
        }
        const data = await response.json()
        console.log('Joke data', data)
        renderJokeInfo(data);
    }
    catch(err){
        console.log('Error occurred while fetching data', err)
    }
    finally{
        jokeLoader.style.display = 'none'   //hide the loader once the data is fetched
        jokeButton.style.display = 'block'     //show the content
    }
}

function renderJokeInfo(jokeInfo){
    const type = document.querySelector(".type")
    const setup = document.querySelector(".setup")
    const punch = document.querySelector(".punch")
    const button = document.querySelector(".joke-button")

    // console.log(jokeInfo)

    type.innerText = `Type: ${jokeInfo.type}`;
    setup.innerText = jokeInfo.setup;
    punch.innerText = jokeInfo.punchline
    button.innerText = `Get another joke`
}

// function runLoader() {
//     const loader = document.querySelector('.loader')
//     const jokeButton = document.querySelector('.joke-button')
//     // loader.style
// }