export class Alerts{
    constructor(){

    }

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
                console.log(this.sheepStatus);
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
}