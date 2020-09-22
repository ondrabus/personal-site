document.querySelectorAll(".code").forEach(element => {
    let button = element.querySelector("a");
    let data = element.querySelector("textarea");
    console.log(data);

    button.onclick = function(){
        data.select();
        data.setSelectionRange(0, 99999);

        document.execCommand("copy");
        button.innerText = "Copied!";
    }
})