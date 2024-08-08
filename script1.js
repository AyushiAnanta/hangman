let input;
let word;
let letters;
let charec = '';
let WrongGuess = 0;
let score = 0;
let chr =0;
let dar = '';
let res = document.querySelector("#result");
let poof = document.querySelector("#section3");
let msg =''


function bringAlphabets() {

    input = document.querySelector("#input");
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));
    
    let alphabets = '';
    for (i=0 ; i<26 ; i++) {
        alphabets += `<div class="letter" id ="${i}">${alphabet[i]}</div>`;
    };
    input.innerHTML = alphabets;

};

bringAlphabets();

function chooseWord() {
    const WORD_CLUE = {
        Cat: 'A common pet.',
        Tree: 'Grows in forests.',
        Fish: 'Swims in water.',
        Book: 'You read it.',
        House: 'Where you live.',
        Plane: 'Flies in the sky.',
        Chair: 'You sit on it.',
        Bread: 'You eat it.',
        Apple: 'A type of fruit.',
        Smile: 'Shows happiness.',
        Dog: 'A loyal pet.',
        Car: 'Drives on roads.',
        Sun: 'Shines in the sky.',
        Moon: 'Seen at night.',
        Star: 'Twinkles in the sky.',
        Bird: 'Flies in the air.',
        Shoe: 'Worn on feet.',
        Pen: 'Used for writing.',
        Phone: 'Used to call.',
        Clock: 'Tells time.',
        Lamp: 'Provides light.',
        Bed: 'You sleep on it.',
        Cup: 'Used for drinking.',
        Boat: 'Floats on water.',
        Door: 'You open it.',
        Key: 'Unlocks things.',
        Window: 'You look through it.',
        Bag: 'Used to carry items.',
        Hat: 'Worn on head.',
        Ball: 'Used in games.',
        Train: 'Runs on tracks.',
        Box: 'Used to store things.',
        Cake: 'A sweet treat.',
        Spoon: 'Used for eating.',
        Fork: 'Used for eating.',
        Pillow: 'Rests your head.',
        Blanket: 'Keeps you warm.',
        Horse: 'A large animal.',
        Cupboard: 'Stores dishes.',
        Mouse: 'Small rodent.',
        Computer: 'Used to work.',
        Table: 'You eat at it.',
        Milk: 'A dairy drink.',
        Cheese: 'Made from milk.',
        Knife: 'Used for cutting.',
        Rain: 'Falls from the sky.',
        Snow: 'Frozen water.',
        Ice: 'Frozen water.',
        Water: 'You drink it.',
        Fire: 'Produces heat.',
        Wind: 'Blows air.',
        Plant: 'Grows in the ground.',
        River: 'Flows to the sea.',
        Mountain: 'Very tall land.',
        Beach: 'Sandy shore.',
        Music: 'Sound you hear.'
    };
    
    
    // Extract the keys of the WORD_CLUE object into an array
    const keys = Object.keys(WORD_CLUE);
    
    let index = Math.floor(Math.random()*50)

    let keyAtIndex = keys[index];  

    //clue
    
    let clue = WORD_CLUE[keyAtIndex];
    
    
    document.querySelector("#clue").innerHTML = `Clue : ${clue}`

    // guess

    word = keyAtIndex;
    let char = '';
    letters = word.split(''); 

    letters.forEach(letter => {
        char += `<div class="space"></div>`;
    });
    document.querySelector("#guessWord").innerHTML = char;
    
}

chooseWord()

function refresh() {
    WrongGuess =0
    chr = 0
    bringAlphabets();
    chooseWord();
    res.innerText = "Let's Play !";
    document.querySelector("#hangman").innerHTML = `<img class="hm" id="1" src="1.png" alt=""></img>`;
    check();


}

function startTimer(message) {
    let time = 2;

    clearInterval(gameTimer); // Clear any previous timer
    var gameTimer = setInterval(() => {
        if (time > 0) {
            
            poof.innerHTML = `<h2>${message}</h2><h5>Next question --></h5>`;
            time--;
        } else {
            clearInterval(gameTimer);
            poof.innerHTML = `<div id="clue"></div><div id="input"></div><div id="result">Let's play!</div>`;
            refresh();
        }
    }, 1000);
}

function lTimer() {
    startTimer("You Lost!");
}

function rTimer() {
    startTimer("You Won!");
}


function right(clicked) {
    
    let ch='';
    
    ch += document.querySelector("#guessWord").innerText;
    
    charec=''
    
    
    letters.forEach(letter => {
        if (letter.toUpperCase() == clicked) {
            charec += `<div class="space">${clicked}</div>`;
            if (ch.includes(letter.toUpperCase()) != true) {
                chr++
            }
        } else if (ch.includes(letter.toUpperCase()) == true){

            charec += `<div class="space">${letter.toUpperCase()}</div>`;
        } else {
            charec += `<div class="space"></div>`;
        }
        
        
    });
    document.querySelector("#guessWord").innerHTML = charec;
    
    
    

    if (chr == letters.length) {
        document.querySelector("#section3").innerHTML = `<h2>You Won !</h2>`
        score += 10;
        document.querySelector("#score").innerText = `score : ${score}`;
        rTimer()
    }
    


}

function wrong(target) {
    
    
    WrongGuess++;
    const images = ["1.png","2.png","3.png","4.png","5.png","6.png","7.png"]
    if  (WrongGuess >= 6) {
        document.querySelector("#hangman").innerHTML = `<img class="hm" id="1" src="7.png" alt=""></img>`;
        score -= 5;
        dar = '';
        letters.forEach(letter => {
            
            dar += `<div class="space">${letter}</div>`;

        });
        document.querySelector("#guessWord").innerHTML = dar;
        document.querySelector("#score").innerText = `score : ${score}`;
        lTimer()

    } else{
        res.innerText = "Wrong !";
        let src = images[WrongGuess];
        document.querySelector("#hangman").innerHTML = `<img class="hm" id="1" src="${src}" alt=""></img>`;
        

    }
 
}

function check() {
    input.addEventListener("click" , function(dets) {
        const target = dets.target;
        let clicked = target.innerText;
        if (clicked) {
            if ((word.toUpperCase().includes(clicked)) == true) {
                right(clicked);
            } else {
                wrong(target);
                
            };
        };
    });
    
};

check()



document.querySelector("#refresh").onclick = function() {
    refresh();

}