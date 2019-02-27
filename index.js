var Word = require("./word")
var inquirer = require("inquirer");
var CFonts = require('cfonts');

var currentWord="";
var newWord;
var plays=0;
var pickedWords=[];
var pickedLetters=[];
var guesses=10;
var words=["Salad","Tomato","Nirvana", "Florian"]

function start(){
    CFonts.say("hangman", {
        font: 'simple',   
        colors: ['whiteBright'], 
    });
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to play Hangman?",
            name: "confirm",
            default: true
        },
    ])
    .then(function(inquirerResponse) {
        if(inquirerResponse.confirm){
            playGame()
        }
        else{
            console.log("\nCome back anytime!\n")
        }
    }).catch(function(err){
        console.log(err)
    });
}

function playGame(){
    plays++;
    console.log("Game #: "+plays)
    guesses=10;
    pickedLetters=[];
    currentWord=chooseWord();
    newWord=new Word(currentWord);
    newWord.wordSplit();
    playerGuess()
}

function chooseWord(){
    ranIndex=Math.floor(Math.random() * words.length);
    newWord=words[ranIndex];
    if(!pickedWords.includes(newWord)){
        pickedWords.push(newWord)
        return newWord.toUpperCase()
    }
    else{
        chooseWord()
    }
    //console.log(newWord)
}

function playerGuess(){
    newWord.displayWord()
    inquirer.prompt([
        {
            type: "input",
            message: "Please guess by entering one letter at a time:",
            name: "entry"
        }
    ])
    .then(function(inquirerResponse) {
        if(inquirerResponse.entry.length===1){
            userInput=inquirerResponse.entry.toUpperCase();
            pickedLetters.push(userInput);
            gussesLeft()
        }
        else{
            console.log("\n*** You must enter one character at a time ***\n") 
            userInput=".";
            gussesLeft()
        }
    }).catch(function(err){
        console.log(err)
    });
};

function gussesLeft(){
    if(guesses!=1){
        rightWrong()
    }
    else{
        lose()
    }
}

function rightWrong(){
    letterCheck=[];
    newWord.checkLetter();
    newWord.letters.forEach(letter => {
        //letter.check(userInput)
        letterCheck.push(letter.onScreen)
    })
    //console.log(letterCheck)
    if(!letterCheck.includes("_")){
        win()
    }
    else if(!letterCheck.includes(userInput)){
        guesses--
        console.log("You have "+guesses+" guesses left");
        playerGuess()
    }
    else{
        console.log("You have "+guesses+" guesses left");
        playerGuess()
    }
}

function win(){
    newWord.displayWord();
    CFonts.say("congrats!\nyou won!", {
        font: 'simple',   
        colors: ['white'], 
    });
    if(plays===1){
        console.log("You've reached Level 1!\n")
    }
    if(plays===2){
        console.log("You've reached Level 2!\n")
    }
    if(plays===3){
        console.log("You've reached Level 3!\n")
    }
    if(plays<4){
        playAgain()
    }
    else{
        CFonts.say("\nlevel 4", {
            font: 'simple',   
            colors: ['cyan'], 
        });
        restart()
    }
}

function lose(){
    CFonts.say("you lose :(", {
        font: 'simple',   
        colors: ['magenta'], 
    });
    restart()
}

function playAgain(){
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to play again?",
            name: "confirm",
            default: true
        },
    ])
    .then(function(inquirerResponse) {
        if(inquirerResponse.confirm){
            playGame();
        }
        else{
            console.log("\nCome back anytime!\n")
        }
    }).catch(function(err){
        console.log(err)
    });
}

function restart(){
    CFonts.say("GAME OVER", {
        font: 'simple', 
        align: 'left',  
        colors: ['white','white'], 
    });
    inquirer.prompt([
        {
            type: "confirm",
            message: CFonts.say("Would you like to start again?", {
                font: 'console', 
                align: 'left',  
                colors: ['white'], 
            }),
            name: "confirm",
            default: true
        },
    ])
    .then(function(inquirerResponse) {
        if(inquirerResponse.confirm){
            plays=0;
            start()
        }
        else{
            console.log("\nCome back anytime!\n")
        }
    }).catch(function(err){
        console.log(err)
    });
}

start()