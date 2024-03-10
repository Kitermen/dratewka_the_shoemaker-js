import { Alerts } from "./Alerts.js";

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
        this.sheepStatus = "sheep-undone";
        this.dragonKilled = false;
        this.setUp();
        this.input.addEventListener("keydown", (e)=>this.move(this.currPosition, e));
    }

    //walkie-man
    move(currPosition, e){
        if(e.key != "Enter"){
            return;
        }
        let input = e.target.value;
        input.split(" ").length > 2 ? this.alert("wrong-command") : console.log("");
        let command = input.split(" ")[0];
        let para = input.split(" ")[1];
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
                    if(this.dragonKilled == false && this.currPosition.x == 2 && this.currPosition.y == 4){
                        this.alert("dragon-still-alive");
                    }
                    else{
                        currPosition.x -= 1;
                        this.setUp('west');
                    }
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
                if(para == undefined || para.length < 1){
                    this.alert("wrong-command");
                }
                else{
                    this.take(para);
                }
            break;

            case "D":
            case "DROP":
                if(para == undefined || para.length < 1){
                    this.alert("wrong-command");
                }
                else{
                    this.drop(para);
                }
            break;

            case "U":
            case "USE":
                if(para == undefined || para.length < 1){
                    this.alert("wrong-command");
                }
                else{
                    this.use(para);
                }
            break;

            default:
                this.alert("wrong-command");
        }
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

            this.itemsNearby()

            this.carriedItem()

            this.terminal.style.visibility = "visible";
            this.query.innerText = "What now?";
            this.input.focus();
        }, 800)
    }
    
    //must be separated from setUp() for better performance...
    directionsToGo(){
        this.direction.innerHTML = "";
        this.directions.forEach(dir => {
            //console.log(this.movement[this.currPosition.y - 1][this.currPosition.x - 1].moves);
            if(this.movement[this.currPosition.y - 1][this.currPosition.x - 1].moves.includes(`${dir.toUpperCase()}`)){
                document.getElementById(`${dir}`).style.display = "none";
                this.direction.innerHTML += `${dir.toUpperCase()},&nbsp`;
            }
            else{
                document.getElementById(`${dir}`).style.display = "block";
            }
        })
        console.log(this.direction.innerHTML);
        this.direction.innerText = this.direction.innerText.slice(0, -2);
    }

    itemsNearby(){
        this.sight.innerText = "";
        let itemsHere = this.movement[this.currPosition.y - 1][this.currPosition.x - 1].items;
        let sheepItemsHere = this.movement[this.currPosition.y - 1][this.currPosition.x - 1].sheepItems;
        if((itemsHere.length == 0 && `${this.currPosition.y}${this.currPosition.x}` != "43") || (`${this.currPosition.y}${this.currPosition.x}` == "43" && itemsHere.length == 0 && sheepItemsHere.length == 0)){
            this.sight.innerText = "nothing";
        }
        else{
            this.sight.innerHTML = "";
            if(`${this.currPosition.y}${this.currPosition.x}` == "43"){
                this.movement[this.currPosition.y - 1][this.currPosition.x - 1].sheepItems.forEach(item=> {this.sight.innerHTML += `${this.items[item][0]},&nbsp;`});
            }
            itemsHere.forEach(item=> {this.sight.innerHTML += `${this.items[item][0]},&nbsp;`});
            this.sight.innerText = this.sight.innerText.slice(0, -2);
        }
    }

    carriedItem(){
        if(this.held.length == 0){
            this.carried.innerText = "nothing";
        }
        else{
            this.carried.innerText = this.items[this.held[0]][0];
        }
    }

    //game-alerts
    alert(type, text){
        this.terminal.style.visibility = "hidden";
        let i = 1500;
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
            case "picking-item":
                this.query.innerText = `You are taking ${text}`;
            break;
            case "dropping-item":
                this.query.innerText = `You are about to drop ${text}`;
            break;
            case "hands-full":
                this.query.innerText = `You are carrying something`;
            break;
            case "hands-empty":
                this.query.innerText = `You are not carrying anything`;
            break;
            case "location-full":
                this.query.innerText = `You can't store any more here`;
            break;
            case "incorrect-item":
                this.query.innerText = `You are not carrying it`;
            break;
            case "content-creator":
                this.query.innerText = `${text}`;
                if(this.held[0] == 24){
                    i = i + 1200;
                    setTimeout(()=>{
                        this.query.innerHTML += "<br>and digging...";
                    }, 900)
                    setTimeout(()=>{
                        this.query.innerHTML += "<br>That's enough sulphur for you";
                    }, 1800)
                }
                
                if(this.sheepStatus != "sheep-undone")
                    setTimeout(()=>{
                        switch(this.sheepStatus){
                            case "sheep-prepared":
                                this.query.innerText = "Your fake sheep is full of poison and ready to be eaten by the dragon";
                            break;
                            case "sheep-eaten":
                                this.query.innerText = "The dragon ate your sheep and died!";
                            break;
                        }
                    }, 2000)
            break;
            case "wrong-item-on-location":
                this.query.innerText = "You aren't carrying anything like that";
            break;
            case "wrong-location-for-item":
                this.query.innerText = "Nothing happened";
            break;
            case "dragon-still-alive":
                this.query.innerHTML = "You can't go that way...";
                setTimeout(()=>{
                    this.query.innerHTML += "<br>The dragon sleeps in a cave!";
                }, i / 2)
            break;
        }
        if(this.sheepStatus == "sheep-prepared" || this.sheepStatus == "sheep-eaten"){
            i = i + 3000;
        }
        setTimeout(()=>{
            this.directionsToGo()
            this.terminal.style.visibility = "visible";
            this.query.innerText = "What now?";
            this.input.focus();
        }, i)
    }
            
    //vocabulary or gossips
    hint(json){
        json == "gossips" ? json = this.gossips : json = this.vocabulary;
        this.downContainer.style.display = "none";
        this.hints.style.display = "block"
        for(let i = 0; i < json.length; i += 1){
            this.a = setTimeout(()=>{
                let line = json[i];
                line = line.split("");
                for(let j = 0; j < line.length; j += 1){
                    this.b = setTimeout(()=>{
                        this.hints.innerHTML += line[j] == "\n" ? "<br>" : line[j];
                    }, 8 * j)
                }
            }, 400 * i)
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
        }, 2500)
    }
    
    //taking the item from location
    take(item){
        if(this.held.length == 0){
            let itemsHere = [];
            let found = false;
            if(this.movement[this.currPosition.y - 1][this.currPosition.x - 1].items.length > 0){
                this.movement[this.currPosition.y - 1][this.currPosition.x - 1].items.forEach(num=>{
                    itemsHere.push(num);
                })
                itemsHere.forEach(num=>{
                    if(this.items[num][2] == item){
                        found = true;
                        this.alert("picking-item", this.items[num][0]);
                        setTimeout(()=>{
                            this.held.push(num);
                            this.carried.innerText = this.items[num][2];
                            console.log(this.movement[this.currPosition.y - 1][this.currPosition.x - 1].items);
                            this.movement[this.currPosition.y - 1][this.currPosition.x - 1].items = this.movement[this.currPosition.y - 1][this.currPosition.x - 1].items.filter(x => x != num);
                            console.log(this.movement[this.currPosition.y - 1][this.currPosition.x - 1].items);
                            this.itemsNearby()
                        }, 800)
                    }
                })
                if(!found){
                    this.alert("no-items");
                }
            }
            else{
                this.alert("no-items");
            }
        }
        else{
            this.alert("hands-full");
        }
    }

    //dropping the item
    drop(item){
        let countItems = this.movement[this.currPosition.y - 1][this.currPosition.x - 1].items.filter(x => x != 13 && x != 17 && x != 20 && x != 23 && x != 26 && x != 29 && x != 30 && x != 34);
        console.log(countItems);
        if(this.movement[this.currPosition.y - 1][this.currPosition.x - 1].items.length < 3){
            if(this.held.length){
                let havingItem = false;
                Object.entries(this.items).map(entry => {
                    if(item == entry[1][2]){
                        havingItem = true;
                        this.alert("dropping-item", entry[1][0]);
                            setTimeout(()=>{
                                this.held = [];
                                this.movement[this.currPosition.y - 1][this.currPosition.x - 1].items.push(entry[0]);
                                this.carried.innerText = "nothing";
                                this.itemsNearby();
                            }, 800)
                    }
                })
                if(!havingItem){
                    this.alert("incorrect-item");
                }
            }
            else{
                this.alert("hands-empty");
            }
        }
        else{
            this.alert("location-full");
        }
    }

    //using the item
    use(item){
        if(item == "PRIZE" && this.movement[3][2].sheepItems[0] == 30){
            document.querySelector(".game-container").style.display = "none";
            document.querySelector(".intro").style.opacity = "1";
            document.querySelector(".intro").src = "/game_elements/img2/win_screen.avif";
            return;
        }
        console.log("-------------------------");
        const dependence = this.locations.find(one => one.location == `${this.currPosition.y}${this.currPosition.x}` && one.item1 == this.held[0])
        //dependence - object with location (locations.json) player stays at the moment, aka "can I craft smth on this location"
        if(this.held.length == 1 && item == this.items[this.held[0]][2]){
            if(dependence){
                if(dependence.location == "43"){
                    this.held = [];
                    item == "KNIFE" ? this.held.push(dependence.item2) : this.movement[this.currPosition.y - 1][this.currPosition.x - 1].sheepItems.push(dependence.item2);
                    if(this.movement[this.currPosition.y - 1][this.currPosition.x - 1].sheepItems.length == 6 || item == "SHEEP"){
                        //phase when this.query displays 2 alerts (one by one)
                        item == "SHEEP" ? this.sheepStatus = "sheep-eaten" : this.sheepStatus = "sheep-prepared";
                        this.alert("content-creator", `${dependence.text}`, this.sheepStatus);
                        setTimeout(()=>{
                            if(item == "SHEEP"){
                                this.dragonKilled = !this.dragonKilled;
                                this.movement[this.currPosition.y - 1][this.currPosition.x - 1].image = "dragon.bmp";
                                this.movement[this.currPosition.y - 1][this.currPosition.x - 1].color = "rgb(169,169,169)";
                                this.location.src = `/game_elements/img/${this.movement[this.currPosition.y - 1][this.currPosition.x - 1].image}`;
                                this.location.style.backgroundColor = this.movement[this.currPosition.y - 1][this.currPosition.x - 1].color;
                                this.sheepStatus = "sheep-undone";
                            }
                            else{
                                this.held.push(37);
                                this.movement[this.currPosition.y - 1][this.currPosition.x - 1].sheepItems = [];
                            }
                            this.itemsNearby();
                            this.carriedItem();
                        }, 4500)
                    }
                    else{
                        this.alert("content-creator", `${dependence.text}`);
                    }
                }
                else{
                    this.alert("content-creator", `${dependence.text}`);
                    this.held = [];
                    this.held.push(dependence.item2);
                }
                if(this.sheepStatus == "sheep-undone"){
                    setTimeout(()=>{
                        this.itemsNearby();
                        this.carriedItem();
                    }, 800)
                }
            }
            else{
                this.alert("wrong-location-for-item");
            }
        }
        else{
            this.alert("wrong-item-on-location");
        }                       
    }
}