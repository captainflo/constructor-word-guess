var Letter = require("./letter")
var CFonts = require('cfonts');
//var userInput=process.argv[2];

function Word(word){
    this.word=word;
    this.letters=[];
    this.display="";
    /* this.showLetter=function(letter){
        this.letters.push(new Letter.onScreen(letter))
    } */
    this.wordSplit=function(){
        newWord=this.word.split("")
        for (i=0;i<newWord.length;i++){
            newLetter= new Letter(newWord[i]);
            this.letters.push(newLetter)
        }
    }
    this.checkLetter=function(){
        this.letters.forEach(letter => {
            letter.check(userInput)
        })
    }
    this.displayWord=function(){
        this.display="";
        this.letters.forEach(letter => {
            letter.display()
            this.display+=letter.onScreen+" ";
        })
        //console.log("\n"+this.display+"\n")
        CFonts.say(this.display, {
            font: 'console',   
            colors: ['cyanBright'], 
        });
    }
}

module.exports = Word;
/* var word1 = new Word("hello there")
word1.wordSplit()
word1.checkLetter()
word1.displayWord() */
