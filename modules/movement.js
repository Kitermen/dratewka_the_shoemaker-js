export class Location{
    constructor(data){
        this.headline = document.querySelector(".headline");
        this.location = document.querySelector(".location");
        this.compass = document.querySelector(".compass");
        this.direction = document.querySelector(".direction");
        this.sight = document.querySelector(".sight");
        this.carriedItem = document.querySelector(".carried-item");

        this.inputSpan = document.querySelector(".command-line-span");
        this.input = document.querySelector(".command-line-input");

        this.data = data;
        this.movement = this.data[0]
        this.items = this.data[1]
        this.locations = this.data[2]
        this.currentPosition = {x: 7, y: 4};
        this.input.addEventListener("keydown", (e)=>this.move(this.currentPosition, e));
        

    }

    move(currentPosition, e){
        if(e.key != "Enter"){
            return;
        }
        let input = e.target.value;
        switch(input){
            case "n":
            case "north":
                if(currentPosition >= 2){
                    console.log("aaa");
                    currentPosition.y -= 1;
                }
                
            break;
            case "e":
            case "east":
                if(currentPosition >= 2){
                    console.log("aaa");
                    currentPosition.x += 1;
                }
            break;
            case "s":
            case "south":
                if(currentPosition >= 2){
                    console.log("aaa");
                    currentPosition.y += 1;
                }
            break;
            case "w":
            case "west":
                if(currentPosition >= 2){
                    console.log("aaa");
                    currentPosition.x -= 1;
                }
            break;
        }


        console.log(currentPosition);
        this.inputSpan.innerHTML = "";
        this.input.value = "";
        console.log(this.movement, this.items, this.locations);


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

