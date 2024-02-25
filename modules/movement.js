export class Location{
    constructor(data){
        this.headline = document.querySelector(".headline");
        this.location = document.querySelector(".location");

        this.compass = document.querySelector(".compass");
        this.directions = ["north", "east", "south", "west"];
        
        this.direction = document.querySelector(".direction");
        this.sight = document.querySelector(".sight");
        this.carried = document.querySelector(".carried");

        this.hints = document.querySelector(".hints");

        this.downContainer = document.querySelector(".down-container");
        this.query = document.querySelector(".simple-query");
        this.terminal = document.querySelector(".terminal");
        this.wrapper = document.querySelector(".terminal-wrapper");
        this.inputSpan = document.querySelector(".command-line-span");
        this.input = document.querySelector(".command-line-input");

        this.data = data;

        this.movement = this.data[0];
        this.items = this.data[1];
        this.locations = this.data[2];
        this.gossips = this.data[3];
        this.vocabulary = this.data[4];

        this.currPosition = {x: 7, y: 4};
        this.held = [];
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

            case "G":
            case "GOSSIPS":
                this.hint("gossips");
            break;

            case "V":
            case "VOCABULARY":
                this.hint("vocabulary");
            break;
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
            this.sight.innerText = "nothing";
        }
        else{
            itemsNearby.forEach(item=> {this.sight.innerText = this.items[item][0]});
        }

        if(this.held.length == 0){
            this.carried.innerText = "nothing";
        }
        else{
            this.carried.innerText = this.items[this.held[0]][0]
        }
    }

    alert(){     
        this.terminal.style.visibility = "hidden";
        this.query.innerText = "You can't go that way";
        setTimeout(()=>{
            this.terminal.style.visibility = "visible";
            this.query.innerText = "What now?";
            this.input.focus();
        }, 1000);
    }
            

    hint(json){
        console.log(json);
        json == "gossips" ? json = this.gossips : json = this.vocabulary;
        console.log(json);
        this.downContainer.style.display = "none";
        this.hints.style.display = "block"
        for(let i = 0; i < json.length; i += 1){
            this.a = setTimeout(()=>{
                let line = json[i];
                line = line.split("");
                for(let j = 0; j < line.length; j += 1){
                    this.b = setTimeout(()=>{
                        this.hints.innerHTML += line[j] == "\n" ? "<br>" : line[j];
                    }, 8 * j);
                }
            }, 800 * i);
        }
        
        this.c = setTimeout(()=>{
            window.addEventListener("keypress", () => {
                this.downContainer.style.display = "block";
                this.hints.innerHTML = "";
                this.hints.style.display = "none";
                this.inputSpan.innerText = "";
                this.input.value = "";
                this.input.focus();
                clearTimeout(this.a)
                clearTimeout(this.b)
                clearTimeout(this.c)
            });
        }, 500);
    }
                
}
    


