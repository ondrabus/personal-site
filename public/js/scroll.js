window.onscroll = function(){
    if (window.pageYOffset > 80){
        this.document.querySelector("header").classList.add("fixed");
    }
    else
    {
        this.document.querySelector("header").classList.remove("fixed");
    }
}