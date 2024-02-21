export class Location{
    constructor(data){
        this.headline = document.querySelector(".headline");
        this.location = document.querySelector(".location");

        this.compass = document.querySelector(".compass");
        // this.north = document.querySelector(".NORTH");
        // this.east = document.querySelector(".EAST");
        // this.south = document.querySelector(".SOUTH");
        // this.west = document.querySelector(".WEST");
        this.directions = ["north", "east", "south", "west"];
        
        this.direction = document.querySelector(".direction");
        this.sight = document.querySelector(".sight");
        this.carriedItem = document.querySelector(".carried-item");

        this.inputSpan = document.querySelector(".command-line-span");
        this.input = document.querySelector(".command-line-input");
        this.wrapper = document.querySelector(".terminal-wrapper");

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
                    this.headline.innerHTML = this.movement[currPosition.y - 1][currPosition.x - 1].name;
                    this.location.src = `/game_elements/img/${this.movement[currPosition.y - 1][currPosition.x - 1].image}`;
                    this.directions.forEach(dir => {
                        console.log(this.movement[currPosition.y - 1][currPosition.x - 1].moves);
                        if(this.movement[currPosition.y - 1][currPosition.x - 1].moves.includes(`${dir.toUpperCase()}`)){
                            document.getElementById(`${dir}`).style.display = "none";
                            console.log("NOWAY", dir);
                        }
                        else{
                            document.getElementById(`${dir}`).style.display = "block";
                        }
                    })                    
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
        this.inputSpan.innerText = "";
        this.input.value = "";

    }

    setUp(){
        //this.headline.innerHTML = `${this.movement[this.currPosition.y - 1][this.currPosition.x - 1].name}`;
        console.log("xd");
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

