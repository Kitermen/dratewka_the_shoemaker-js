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
        this.itemsHere = [];
        this.setUp();
        this.input.addEventListener("keydown", (e)=>this.move(this.currPosition, e));
    }

    //walkie-man
    move(currPosition, e){
        if(e.key != "Enter"){
            return;
        }
        let input = e.target.value;
        let command = input.split(" ")[0];
        let para = input.split(" ")[1];
        console.log(command);
        switch(command){
            case "N":
            case "NORTH":
                if(this.movement[currPosition.y - 1][currPosition.x - 1].moves.includes('NORTH')){
                    currPosition.y -= 1;
                    this.setUp('north');                   
                }
                else{
                    this.alert("wrong-way");
                } break;

            case "E":
            case "EAST":
                if(this.movement[currPosition.y - 1][currPosition.x - 1].moves.includes('EAST')){
                    currPosition.x += 1;
                    this.setUp('east');
                }
                else{
                    this.alert("wrong-way");
                } break;

            case "S":
            case "SOUTH":
                if(this.movement[currPosition.y - 1][currPosition.x - 1].moves.includes('SOUTH')){
                    currPosition.y += 1;
                    this.setUp('south');
                }
                else{
                    this.alert("wrong-way");
                } break;

            case "W":
            case "WEST":
                if(this.movement[currPosition.y - 1][currPosition.x - 1].moves.includes('WEST')){
                    currPosition.x -= 1;
                    this.setUp('west');
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

            case "T":
            case "TAKE":
                if(para == undefined || para.length < 2){
                    this.alert("wrong-command");
                }
                else{
                    this.take(para);
                }
            break;

            default:
                this.alert("wrong-command");
        }
        const defaultD = this.direction.innerText.slice(0, 11);
        this.direction.innerText = defaultD;
        this.inputSpan.innerText = "";
        this.input.value = "";
    }

    //updates the appearance of game menu
    setUp(where){
        this.terminal.style.visibility = "hidden";
        this.query.innerText = `You are going ${where}...`;
        setTimeout(()=>{
            this.headline.innerHTML = this.movement[this.currPosition.y - 1][this.currPosition.x - 1].name;
            
            this.location.src = `/game_elements/img/${this.movement[this.currPosition.y - 1][this.currPosition.x - 1].image}`;

            this.location.style.backgroundColor = this.movement[this.currPosition.y - 1][this.currPosition.x - 1].color;

            this.directionsToGo();

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

            this.terminal.style.visibility = "visible";
            this.query.innerText = "What now?";
            this.input.focus();
        }, 1500);
    }
    
    //must be separated from setUp() for better performance...
    directionsToGo(){
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
    }

    //wrong-way
    alert(type){ 
        this.terminal.style.visibility = "hidden";
        switch(type){
            case "wrong-way":
                this.query.innerText = "You can't go that way";
            break;
            case "wrong-command":
                this.query.innerText = "Try another word or V for vocabulary";
            break;
            case "no-items":
                this.query.innerText = "There isn't anything like that here";
            break;
        }
        setTimeout(()=>{
            this.directionsToGo()
            this.terminal.style.visibility = "visible";
            this.query.innerText = "What now?";
            this.input.focus();
        }, 1000);
    }
            
    //vocabulary or gossips
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
            }, 400 * i);
        }
        setTimeout(()=>{
            window.addEventListener("keypress", ()=>{
                this.hints.innerText = "";
                this.hints.style.display = "none";
                this.downContainer.style.display = "block";
                this.inputSpan.innerText = "";
                this.input.value = "";
                this.input.focus();
            }, { once: true });
        }, 2500);
    }
    
    take(item){
        this.itemsHere = [];
        if(this.movement[this.currPosition.y - 1][this.currPosition.x - 1].items.length > 0){
            this.movement[this.currPosition.y - 1][this.currPosition.x - 1].items.forEach((num)=>{
                this.itemsHere.push(num);
            })
            console.log(this.itemsHere);
        }
        else{
            this.alert("no-items")
        }
        
        
    }
}
    
//foreach w foreach....
//https://www.geeksforgeeks.org/how-to-get-the-first-key-name-of-a-javascript-object/

