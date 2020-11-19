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
    overlay.style.visibility = "hidden";
});

//Create a phrases array that contains at least 5 different phrases as strings.
const phrases = ['king', 'armor king', 'kazuya mishima', 'jin kazama', 'geese howard', 
'lars alexandersson', 'alisa bosconovitch', 'ling xiaoyu', 'heihachi mishima']

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
    const letters = document.querySelectorAll('.letter');
    let correct = 0;

    for (let i = 0; i < letters.length; i++){
        if( guess === letters[i].innerHTML){
            letters[i].classList.add('show');
            correct++
        }
    }
    if(correct === 0){
        return null
    }
}


const checkWin = () => {
    const letters = document.querySelectorAll('.letter');
    const show = document.querySelectorAll('.show');
    const title = document.querySelector('.title');

    if(letters.length === show.length){
        overlay.style.visibility = "visible";
        overlay.className = 'win'
        title.textContent ='You Won!'
    } else if (missed >= 5){
        overlay.style.visibility = "visible";
        overlay.className = 'lose'
        title.textContent = 'You Lost'
    }
}

qwerty.addEventListener('click', (event) => {
    const tries = document.querySelector('.tries');

    if(event.target.tagName ==='BUTTON'){
    event.target.className = 'chosen';
    event.target.disabled = true;

    const letterFound = checkLetter(event.target.innerHTML);

    if( letterFound === null){
        missed++
        tries.remove();
    }
    checkWin();
    }
})



