
let index = 0;
let cursor = 0;
const texts = [
    "I write tutorials about web technologies...",
    "I publish videos about Jamstack...",
    "I host weekly live streams...",
    "I speak at conferences...",
    "I drive buses..."
];

export function write(reset: boolean): void{
    if (reset) {
        index = 0;
        cursor = 0;
    }

    const element = window.document.querySelector(".teaser p span");
    if (element == null) {
        return;
    }

    if (cursor == 0) {
        element.className = "active";
    }

    element.innerHTML += texts[index].charAt(cursor);

    if (texts[index].length == cursor++){
        element.className = "";
        setTimeout(function(){revert();}, 5000);

        return;
    }
  
    var rand = Math.floor(Math.random() * (100));
    setTimeout(function(){write(false);},rand);
}

export function revert(): void {
    const element = window.document.querySelector(".teaser p span");
    if (element == null) {
        return;
    }

    if (cursor == texts[index].length)
    {
        element.className = "active";
    }

    element.innerHTML = element.innerHTML.slice(0, -1);

    if (cursor-- == 0)
    {
        element.className = "";
        if (index++ == texts.length-1){
            index = 0;
        }
        setTimeout(function(){write(false);}, 1000);

        return;
    }
  
    setTimeout(function(){revert();},20);
}