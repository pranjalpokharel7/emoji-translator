const toggleOn = document.querySelector("#toggle-on");
const toggleOff = document.querySelector("#toggle-off");

toggleOn.addEventListener("click", function() {
    browser.runtime.sendMessage({
        toggle : true, 
    });
});

toggleOff.addEventListener("click", function() {
    browser.runtime.sendMessage({
        toggle : false, 
    });
});

let docu = document.querySelectorAll("button");

for(let i=0; i<docu.length; i++) {
    show = function(){
        navigator.clipboard.writeText(docu[i].textContent);
    }
    docu[i].addEventListener('click',show);
}

let counter = 0;
const next = document.querySelector("#next");
const previous = document.querySelector("#previous");
const pages = document.querySelectorAll(".page");
const lastPage = pages.length;

const pageScroll = (event) => {
    const prevCounter = counter;
    const currentPage = event.target;

    if (currentPage.id === "previous")
        counter = counter === 0 ? lastPage-1 : counter - 1;
    else
        counter = (counter + 1) % lastPage;

    pages[counter].style.display = "block";
    pages[prevCounter].style.display = "none";
}

next.addEventListener("click", pageScroll); 
previous.addEventListener("click", pageScroll); 


