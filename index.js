const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
const result = document.getElementById('result');
const sound = document.getElementById('sound');
const searchButton = document.getElementById('search-button');
const themeToggle = document.getElementById('themeToggle');
const loader = document.querySelector("#loading");


document.getElementById("input")
    .addEventListener("keyup", function(e) {
        if (e.code === 'Enter') {
            searchButton.click();
        }
    });

searchButton.addEventListener('click', ()=>{
    displayLoading()
    let searchWord = document.getElementById('input').value;
    fetch(`${url}${searchWord}`)
    .then((response) => response.json())
    .then((data)=>{
        hideLoading()
        result.innerHTML = `
            <div class="word">
                <h1>${searchWord}</h1>
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>${phoneticTextVerify(data)}</p>
                <button onclick="playSound()">
                   <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="meaning">
            <h3>meaning</h3>
            <p>${data[0].meanings[0].definitions[0].definition}</p>
            <ul>
                ${exampleVerify(data)}

            </ul>
        </div>
        
        `;
        sound.setAttribute("src", `${phoneticAudioVerify(data)}`)
    })
    .catch(() => {
        result.innerHTML = `
        <div class="error">
            <h1 class="error">Oops!</h1>
            <i class="fas fa-book-reader"></i>
            <h3>The word you are looking for can´t be found</h3>
            <p>Please check you have typed the word correctly.</p>
        </div>
        
        `;
    });

});
function playSound(){
    sound.play();
}

function exampleVerify(data){
    var noMoreThanThree = 0
    let examplesList=``
    for (var j=0; j<data[0].meanings.length; j++){
        for (var i=0; i<data[0].meanings[j].definitions.length; i++){
        if (noMoreThanThree === 3){break;}
        if(data[0].meanings[j].definitions[i].example){
            noMoreThanThree = noMoreThanThree + 1;
            examplesList += `<li>${data[0].meanings[j].definitions[i].example}</li>`
        }
        
    }
    }
    
    return examplesList
}
function phoneticTextVerify(data){
    for (var i=0; i<data[0].phonetics.length; i++){
        if(data[0].phonetics[i].text){
            return data[0].phonetics[i].text
        }
    }
}
function phoneticAudioVerify(data){
    for (var i=0; i<data[0].phonetics.length; i++){
        if(data[0].phonetics[i].audio){
            return data[0].phonetics[i].audio
        }
    }
}
function displayLoading() {
    loader.classList.add("display");
    setTimeout(() => {
        loader.classList.remove("display");
    }, 4000);
}

function hideLoading() {
    loader.classList.remove("display");
}

themeToggle.onclick = function(){
    document.body.classList.toggle("dark-theme");
};



