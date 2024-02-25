export class Location{
    constructor(data){
        this.headline = document.querySelector(".headline");
        this.location = document.querySelector(".location");

        this.compass = document.querySelector(".compass");
        this.directions = ["north", "east", "south", "west"];
        
        this.direction = document.querySelector(".direction");
        this.sight = document.querySelector(".sight");
        this.carriedItem = document.querySelector(".carried");

        this.query = document.querySelector(".simple-query");
        this.terminal = document.querySelector(".terminal");
        this.wrapper = document.querySelector(".terminal-wrapper");
        this.inputSpan = document.querySelector(".command-line-span");
        this.input = document.querySelector(".command-line-input");

        this.data = data;
        this.movement = this.data[0]
        this.items = this.data[1]
        this.locations = this.data[2]
        this.currPosition = {x: 7, y: 4};
        this.setUp();
        this.input.addEventListener("keydown", (e)=>this.move(this.currPosition, e));
    }

    move(currPosition, e){
        if(e.key != "Enter"){
            return;
        }
        let input = e.target.value;
        switch(input){
            case "N":
            case "NORTH":
                if(this.movement[currPosition.y - 1][currPosition.x - 1].moves.includes('NORTH')){
                    currPosition.y -= 1;                    
                }
                else{
                    this.alert("wrong-way");
                } break;

            case "E":
            case "EAST":
                if(this.movement[currPosition.y - 1][currPosition.x - 1].moves.includes('EAST')){
                    currPosition.x += 1;
                }
                else{
                    this.alert("wrong-way");
                } break;

            case "S":
            case "SOUTH":
                if(this.movement[currPosition.y - 1][currPosition.x - 1].moves.includes('SOUTH')){
                    currPosition.y += 1;
                }
                else{
                    this.alert("wrong-way");
                } break;

            case "W":
            case "WEST":
                if(this.movement[currPosition.y - 1][currPosition.x - 1].moves.includes('WEST')){
                    currPosition.x -= 1;
                }
                else{
                    this.alert("wrong-way");
                } break;
        }
        const defaultD = this.direction.innerText.slice(0, 11);
        this.direction.innerText = defaultD;
        this.inputSpan.innerText = "";
        this.input.value = "";
        this.setUp();
    }

    setUp(){
        this.headline.innerHTML = this.movement[this.currPosition.y - 1][this.currPosition.x - 1].name;
        this.location.src = `/game_elements/img/${this.movement[this.currPosition.y - 1][this.currPosition.x - 1].image}`;
        this.location.style.backgroundColor = this.movement[this.currPosition.y - 1][this.currPosition.x - 1].color;
        this.directions.forEach(dir => {
            console.log(this.movement[this.currPosition.y - 1][this.currPosition.x - 1].moves);
            if(this.movement[this.currPosition.y - 1][this.currPosition.x - 1].moves.includes(`${dir.toUpperCase()}`)){
                document.getElementById(`${dir}`).style.display = "none";
                this.direction.innerHTML += `${dir.toUpperCase()},&nbsp`;
            }
            else{
                document.getElementById(`${dir}`).style.display = "block";
            }
        })
        if(this.direction.innerText.length > 12){
            this.direction.innerText = this.direction.innerText.slice(0, -2);
        }
        let itemsNearby = this.movement[this.currPosition.y - 1][this.currPosition.x - 1].items;
        if(itemsNearby.length == 0){
            console.log("trelemorele");
            this.sight.innerText = "nothing";
        }
        else{
            itemsNearby.forEach(item=>{
                item = item.toString()
                console.log(this.items[16])
            })
        }
    }

    alert(code){
        switch(code){
            case "wrong-way":
                this.terminal.style.visibility = "hidden";
                this.query.innerText = "You can't go that way";
                setTimeout(()=>{
                    this.terminal.style.visibility = "visible";
                    this.query.innerText = "What now?";
                    this.input.focus();
                }, 1000);
            break;
        }
    }
}


