// function to create sound
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

const music = new sound('sounds/Tekken 3 - Heihachi Mishima Stage.mp3');

const heihachiPain = [
    new sound('sounds/Heihachi/TEKKEN3_00413.wav'), 
    new sound('sounds/Heihachi/TEKKEN3_00414.wav'),
    new sound('sounds/Heihachi/TEKKEN3_00415.wav'),
    new sound('sounds/Heihachi/TEKKEN3_00416.wav'),
    new sound('sounds/Heihachi/TEKKEN3_00417.wav'),
    new sound('sounds/Heihachi/TEKKEN3_00427.wav')
];

const heihachiHit = [
    new sound('sounds/Heihachi/TEKKEN3_00418.wav'), 
    new sound('sounds/Heihachi/TEKKEN3_00419.wav'),
    new sound('sounds/Heihachi/TEKKEN3_00422.wav'),
    new sound('sounds/Heihachi/TEKKEN3_00424.wav'),
    new sound('sounds/Heihachi/TEKKEN3_00425.wav'),
    new sound('sounds/Heihachi/TEKKEN3_00429.wav')
    ];

const heihachiScream = new sound('sounds/Heihachi/TEKKEN3_00426.wav');

const heihachiWin = new sound('sounds/Heihachi/TEKKEN3_00428.wav');

//Mute sound option
const soundButton = document.querySelector('#sound');

function isPlaying(audelem) { return !audelem.paused; }


soundButton.addEventListener('click', (event) =>{
    if(isPlaying(document.getElementsByTagName('audio')[0])){
        music.stop()
        event.target.classList = "fas fa-volume-mute fa-3x"
    } else {
        music.play()
        event.target.classList = "fas fa-volume-up fa-3x"
    }
})

//Get the element with the ID of qwerty and save it to a variable.
const qwerty = document.querySelector('#qwerty');

//Get the element with the ID of phrase and save it to a variable.
const phrase = document.querySelector('#phrase');

//Create a missed variable, initialized to 0, that you’ll use later to keep track of the number of guesses the player has missed
let missed = 0;

const tries = document.querySelectorAll('.tries');



//Attach a event listener to the “Start Game” button to hide the start screen overlay.
const startGameBtn = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');

startGameBtn.addEventListener('click', () => {
    overlay.style.visibility = "hidden";
    music.play();
});

//Create a phrases array that contains at least 5 different phrases as strings.
const phrases = [
'king',
'armor king',
'jin kazama',
'ling xiaoyu',
'heihachi mishima',
'eddie gordo',
'yoshimitsu',
'hwoarang',
'paul phoenix',
'lei wulong',
'tiger jackson',
'marshall law'
];

//randomly choose a phrase from the phrases array and split that phrase into a new array of characters.
const randomNum = (arr) => Math.floor(Math.random() * arr.length);

const getRandomPhraseAsArray = (arr) => {
    
    const newPhrase = arr[randomNum(arr)];
    return newPhrase.split("");
};



const addPhraseToDisplay = (arr) => {

    for (let i = 0; i < arr.length; i++){
        if(arr[i] !== ' '){
            const li = document.createElement('LI');
            li.innerHTML = `${arr[i]}`;
            phrase.firstElementChild.appendChild(li);
            li.className ='letter';
        } else {
            const li = document.createElement('LI');
            li.innerHTML = `${arr[i]}`;
            phrase.firstElementChild.appendChild(li);
            li.className = 'space';
        }
    }
};

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray); 

const checkLetter = (guess) => {
    const letters = document.querySelectorAll('.letter');
    const show = document.querySelectorAll('.show');
    let correct = 0;

    for (let i = 0; i < letters.length; i++){
        if( guess === letters[i].innerHTML){
            letters[i].classList.add('show');
            correct++;
            if(letters.length > (show.length + 1)){
            heihachiHit[randomNum(heihachiHit)].play();
            }
        }
    }
    if(correct === 0){
        
        if(missed < 4){
            heihachiPain[randomNum(heihachiPain)].play();
        }
        return null;
    }
};


const checkWin = () => {
    const letters = document.querySelectorAll('.letter');
    const show = document.querySelectorAll('.show');
    const title = document.querySelector('.title');

    const reset = () => {
        missed = 0;
        phrase.innerHTML = '<ul></ul>';
        const keys = qwerty.getElementsByTagName('button');
        const newPhrase = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(newPhrase);
        startGameBtn.innerHTML ='Try Again'

        for (let i = 0; i < keys.length; i++){
            keys[i].className = '';
            keys[i].disabled = false;
        }

        for (let i = 0; i < tries.length; i++){
            tries[i].innerHTML = '<img src="images/liveHeart.png" height="35px" width="30px">';
        }
    }

    if(letters.length === show.length){
        overlay.style.visibility = "visible";
        overlay.className = 'win';
        title.textContent ='You Won!';
        heihachiWin.play();
        reset();
    } else if (missed >= 5){
        overlay.style.visibility = "visible";
        overlay.className = 'lose';
        title.textContent = 'You Lost';
        heihachiScream.play();
        reset();
    }
};

qwerty.addEventListener('click', (event) => {
    

    if(event.target.tagName ==='BUTTON'){
    event.target.className = 'chosen';
    event.target.disabled = true;

    const letterFound = checkLetter(event.target.innerHTML);

    if( letterFound === null){
        missed++;
        tries[missed - 1].innerHTML = '<img src="images/lostHeart.png" height="35px" width="30px"></img>';
    }
    checkWin();
    }
});



