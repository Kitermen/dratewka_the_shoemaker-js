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
        this.currPosition = {x: 7, y: 4};
        this.input.addEventListener("keydown", (e)=>this.move(this.currPosition, e));
        

    }

    move(currPosition, e){
        if(e.key != "Enter"){
            return;
        }
        let input = e.target.value;
        switch(input){
            case "n":
            case "north":
                if(this.movement[currPosition.y - 1][currPosition.x - 1].moves.includes('NORTH')){
                    console.log("aaa");
                    currPosition.y -= 1;
                }
                else{
                    
                }
                
            break;
            case "e":
            case "east":
                if(this.movement[currPosition.y - 1][currPosition.x - 1].moves.includes('EAST')){
                    console.log("aaa");
                    currPosition.x += 1;
                }
                else{
                    console.log("beka z cb");
                    
                }
            break;
            case "s":
            case "south":
                if(this.movement[currPosition.y - 1][currPosition.x - 1].moves.includes('SOUTH')){
                    console.log("aaa");
                    currPosition.y += 1;
                }
                else{
                    
                }
            break;
            case "w":
            case "west":
                if(this.movement[currPosition.y - 1][currPosition.x - 1].moves.includes('WEST')){
                    console.log("aaa");
                    currPosition.x -= 1;
                }
                else{
                    
                }
            break;
        }


        console.log(currPosition);
        this.inputSpan.innerHTML = "";
        this.input.value = "";
        console.log(this.movement[currPosition.y - 1][currPosition.x - 1])


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

