
//var userInput=process.argv[2]

function Letter (letter){
    this.letter=letter;
    this.chosen=false;
    this.onScreen="_";
    this.display=function(){
        if(this.letter===" "){
            this.chosen=true;
        }
        if(this.chosen){
            this.onScreen=this.letter;
            //console.log(this.onScreen)
        }
        else{
            this.onScreen="_";
            //console.log(this.onScreen)
        }
    }
    this.check=function(userInput){
        if(userInput===this.letter){
            //console.log("You chose correct!\n");
            this.chosen=true;
            //console.log("Chosen letter:"+this.chosen)
            this.display()
        }
        else{
            //console.log("Try again\n")
            //console.log("Chosen letter:"+this.chosen)
            this.display()
        }
    }
}
//var a = new Letter("a")
//a.check()
module.exports=Letter