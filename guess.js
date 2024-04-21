// //setting  game name 
// let gameName = "Guess the word!";
// document.title = gameName;
// document.querySelector('h1').innerHTML = gameName;
// document.querySelector('footer').innerHTML = `${gameName} &copy; 2024`;

// let numberOfTries = 5;
// let numOfletters = 6;
// let currentTry= 1;

// function generateInput(){
//     const inputContainer = document.querySelector('.inputs');
// }

const letters = document.querySelectorAll('.scoreboard-letter');
const loadingDiv = document.querySelector('.info-bar');
const ANSWER_LENGTH = 5;

async function init() {

   
    const res = await fetch("https://words.dev-apis.com/word-of-the-day");
    const resObj = await res.json();
    const word = resObj.word.toUpperCase();
    setLoding(false);
    let currentGuess = '';
let currentRow = 0;
    function addLetter(letter) {
        if (currentGuess.length < ANSWER_LENGTH) {
            currentGuess += letter;
            letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText = letter;
        } else {
            // Do nothing or handle the case when the guess length exceeds ANSWER_LENGTH
        }
    }

     async function commit() {
        if (currentGuess.length !== ANSWER_LENGTH) {
            // Do nothing  
            return;
           
        }
        currentRow++;
        currentGuess = '';
    }

    function backspace() {
        currentGuess=current = currentGuess.substring(0, currentGuess.length - 1) ;
        letters[ANSWER_LENGTH * currentRow + currentGuess.length ].innerText = "";
    }

    function isLetter(letter) {
        return /^[a-zA-Z]$/.test(letter);
    }

    document.addEventListener('keydown', function handleKeyPress(event) {
        const action = event.key;
        if (action === 'Enter') {
            commit();
        } else if (action === 'Backspace') {
            backspace();
        } else if (isLetter(action)) {
            addLetter(action.toUpperCase());
        } else {
            // Do nothing or handle other key actions
        }
    });
}
function setLoding(isLoading){
    loadingDiv.classList.toggle('hidden', !isLoading);  
}
init();
