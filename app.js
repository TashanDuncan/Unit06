//Get the element with the ID of qwerty and save it to a variable.
const qwerty = document.querySelector('#qwerty');

//Get the element with the ID of phrase and save it to a variable.
const phrase = document.querySelector('#phrase');

//Create a missed variable, initialized to 0, that you’ll use later to keep track of the number of guesses the player has missed
let missed = 0;

//Attach a event listener to the “Start Game” button to hide the start screen overlay.
const startGameBtn = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');

startGameBtn.addEventListener('click', () => {
    overlay.style.visibility = "hidden"
});

//Create a phrases array that contains at least 5 different phrases as strings.
const phrases = ['king', 'armor king', 'kazuya mishima', 'jin kazama', 'geese howard']

//randomly choose a phrase from the phrases array and split that phrase into a new array of characters.
const getRandomPhraseAsArray = (arr) => {
    const randomNum = Math.floor(Math.random() * arr.length);
    const newPhrase = arr[randomNum];

    return newPhrase.split("");
}



const addPhraseToDisplay = (arr) => {

    for (let i = 0; i < arr.length; i++){
        if(arr[i] !== ' '){
            const li = document.createElement('LI');
            li.innerHTML = `${arr[i]}`;
            phrase.firstElementChild.appendChild(li)
            li.className ='letter';
        } else {
            const li = document.createElement('LI');
            li.innerHTML = `${arr[i]}`;
            phrase.firstElementChild.appendChild(li)
            li.className = 'space';
        }
    }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray); 

const checkLetter = (guess) => {
    letters = document.querySelectorAll('.letter');

    for (let i = 0; i < letters.length; i++){
        if( guess === letters[i]){
            letters[i].className = 'show';
        } else{
            return null;
        }
    }

}

qwerty.addEventListener('click', (event) => {
    if(event.target.tagName ==='BUTTON'){
    event.target.className = 'chosen';
    event.target.disabled = true;
    }
})