export class Location{
    constructor(data){
        this.headline = document.querySelector(".headline");
        this.location = document.querySelector(".location");
        this.compass = document.querySelector(".command-line");
        this.input = document.querySelector(".command-line");
        this.input = document.querySelector(".command-line");
        this.input = document.querySelector(".command-line");
        this.input = document.querySelector(".command-line");
        this.input = document.querySelector(".command-line");

        this.data = data;
        this.currentPosition = {x: 7, y: 4};
        this.input.addEventListener("keydown", this.move);
        console.log(data);
    }

    move(e){
        if(e.key != "Enter"){
            return;
        }
        let input = e.target.value;
        switch(input){
            case "n":
            case "north":
                this.currentPosition.y -= 1;
                
            break;
        }








    }

}



// window.onkeydown = function(e){
//     switch(e.key){    
//         case "ArrowUp": {

//             }
//             break
//         }
//     }
// }

