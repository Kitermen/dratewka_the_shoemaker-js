const spanElement = document.querySelector('.command-line-span');

function updateChange(event) {
    event.target.value = event.target.value.toUpperCase()
    let value = event.target.value.toUpperCase();
    console.log(value);
    spanElement.innerText = value.toUpperCase();
}