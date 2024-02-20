//imports
import { Location } from "./modules/movement.js";
async function getData(file){
    const result = await fetch(file);
    const snapData = await result.json();
    return snapData;
}
const data = ["./json/movement.json", "./json/items.json", "./json/locations.json"];
Promise.all(data.map(async(src)=>{
    return await getData(src);
}))
.then(snap=>{
    const location = new Location(snap);
})


//intro
const intros = document.querySelector('.intro');
const container = document.querySelector('.game-container');

function animate(i){
        intros.classList.remove("animate");
        intros.src = `./game_elements/img2/intro-${i}.jpeg`;
        setTimeout(()=>{
            intros.classList.add("animate");
            setTimeout(()=>{
                if(i != 3) animate(i + 1);
                else{
                    intros.style.opacity = 0;
                    container.classList.add('containerShowUp');
                    container.style.opacity = 1;
                }
            }, 100);
        }, 10)
}
animate(1);

