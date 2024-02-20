const spanElement = document.querySelector('.command-line-span');

function updateChange(event) {
    const value = event.target.value;
    spanElement.innerText = value;
}