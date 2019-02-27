var Word = require("./word")
var inquirer = require("inquirer");
var CFonts = require('cfonts');

var currentWord="";
var newWord;
var plays=0;
var pickedWords=[];
var pickedLetters=[];
var guesses=10;
var words=["Radiohead","Red Hot Chilli Peppers","Nirvana","Pearl Jam","Weezer","Green Day","Coldplay","Foo Fighters","Muse","The Killers","Artic Monkeys","The Strokes","No Doubt","Arcade Fire"]

function start(){
    CFonts.say("alt bands\nhangman", {
        font: 'simple',   
        colors: ['magentaBright'], 
    });
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to play Alternative Bands Hangman?",
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
        colors: ['magenta'], 
    });
    if(plays===1){
        console.log("You've reached Rock Novice Level!\n")
    }
    if(plays===2){
        console.log("You've reached Rock Enthusiast Level!\n")
    }
    if(plays===3){
        console.log("You've reached Rock Roadie Level!\n")
    }
    if(plays<4){
        playAgain()
    }
    else{
        CFonts.say("rock master\nlevel", {
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
        font: 'chrome', 
        align: 'left',  
        colors: ['magenta','magenta'], 
    });
    inquirer.prompt([
        {
            type: "confirm",
            message: CFonts.say("Would you like to start again?", {
                font: 'console', 
                align: 'left',  
                colors: ['magenta'], 
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