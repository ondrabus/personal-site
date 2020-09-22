var texts = ["I write tutorials about web technologies...", "I publish videos about Jamstack...", "I drive buses..."];
var element = document.querySelector(".teaser p span");
var index = 0;
var cursor = 0;

function write(){
    if (cursor == 0)
    {
        element.className = "active";
    }

    element.innerHTML += texts[index].charAt(cursor);

    if (texts[index].length == cursor++){
        element.className = "";
        setTimeout(function(){revert();}, 5000);

        return;
    }
  
    var rand = Math.floor(Math.random() * (100));
    setTimeout(function(){write();},rand);
}

function revert(){
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
        setTimeout(function(){write();}, 1000);

        return;
    }
  
    setTimeout(function(){revert();},20);
}

window.onload = function(){ write(); }