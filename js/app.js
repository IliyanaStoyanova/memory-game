const tilesContainer = document.querySelector(".tiles");
const colors = ["aqua", "aquamarine", "crimson", "blue", "dodgerblue", "gold", "greenyellow", "teal"];
const colorsPicklist = [...colors, ...colors];
const tileCount = colorsPicklist.length;

let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

const buildTile = (color) => {
  const divElement = document.createElement("div");
  divElement.classList.add("tile");
  divElement.setAttribute("data-color", color);
  divElement.setAttribute("data-revealed", "false");
  
  divElement.addEventListener('click', () => {
    const revealed = divElement.getAttribute("data-revealed");
    if (awaitingEndOfMove || revealed === "true" || divElement == activeTile) {
			return;
		}
    
    divElement.style.backgroundColor = color;
    
    if(!activeTile) {
      activeTile = divElement;
      return;
    }

    const colorToMatch = activeTile.getAttribute("data-color");
    console.log(colorToMatch);
    if(colorToMatch === color) {
      divElement.setAttribute("data-revealed", "true");
      activeTile.setAttribute("data-revealed", "true");

      activeTile = null;
      awaitingEndOfMove = false;
      revealedCount += 2;

      if(revealedCount === tileCount) {
        alert("You win!");
      }
      return;
    } 

    awaitingEndOfMove = true;
    setTimeout(() => {
			activeTile.style.backgroundColor = null;
			divElement.style.backgroundColor = null;

			awaitingEndOfMove = false;
			activeTile = null;
		}, 1000);
  });
  return divElement;
}

for (let i = 0; i < tileCount; i++) {
	const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
	const color = colorsPicklist[randomIndex];
	const tile = buildTile(color);

	colorsPicklist.splice(randomIndex, 1);
	tilesContainer.appendChild(tile);
}

